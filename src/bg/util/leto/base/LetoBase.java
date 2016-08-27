package bg.util.leto.base;

import java.util.HashMap;
import java.util.Map;

import bg.util.leto.api.Leto;
import bg.util.leto.api.LetoException;
import bg.util.leto.api.LetoPeriod;
import bg.util.leto.api.LetoPeriodType;
import bg.util.leto.api.LetoPeriodStructure;

/**
 * This is an abstract class that can be used as base (parent) for any leto (calendar) implementation. 
 * It offers some usefull utilities like calculating the current date given the number of days from the 
 * leto (calendar) EPOCH.
 * <br/>
 * In fact each instance of a class that inherits from LetoBase, is a representation of a given date.
 */
public abstract class LetoBase implements Leto {
    
    
    /**
     * All inheriting classes should define the beginning of their calendar in days before the java EPOCH. 
     * @return The beginning of calendar in days before java EPOCH.
     */
    public abstract long startOfCalendarInDaysBeforeJavaEpoch();
    
    /**
     * All inheriting classes should define the supported calendar period types. For example the Gregorian calendar 
     * would return day, month, year, century (a period of 100 years) and 400 years period.
     * @return An array of all of the supported period types sorted in increasing order. The smolest period first
     * (with lower index). 
     */
    public abstract LetoPeriodType[] getCalendarPeriodTypes();
    
    /**
     * Calculate the exact period values for the today's date. In general this method will calculate how much days have
     * elapsed since Java epoch (1-st January 1970) an then add the days from the beginning of the calendar.
     * Based on that data it would try to split that amount of dates into periods and fill in a LetoPeriod array. 
     * The LetoPeriod array should have the exact same size as the array returned by getCalendarPeriodTypes(). 
     * @return The exact period values of the current today's date.
     * @throws LetoException If there is a problem during calculation or if the calendar internal structures are not 
     *     well defined.
     */
    public LetoPeriod[] getToday() throws LetoException {
        long days = startOfCalendarInDaysBeforeJavaEpoch();
        long millisFromJavaEpoch = System.currentTimeMillis() + 2L * 60L * 60L * 1000L;  // Two hours ahead of GMT.
        long millisInDay = (1000L * 60 * 60 * 24);   // Millis in a day.
        long daysFromJavaEpoch = millisFromJavaEpoch / millisInDay;  // How much complete days have passed since EPOCH
        days = days + daysFromJavaEpoch; 
        
        return calculateCalendarPeriods(days);
    }
    
    
    /**
     * Calculate the periods based on the number of days since the leto (calendar) EPOCH.
     * @param days Number of days since the calendar starts.
     * @return The calculated array of periods.
     * @throws LetoException If there is some unrecoverable error while calculating the date.
     */
    public LetoPeriod[] calculateCalendarPeriods(long days) throws LetoException {
        LetoPeriodType[] types = getCalendarPeriodTypes();
        if (types == null || types.length <= 0) {
            throw new LetoException("This calendar does not define any periods.");
        }
        Map<LetoPeriodType, Long> periods = new HashMap<LetoPeriodType, Long>(types.length);
        Map<LetoPeriodType, Long> periodAbsoluteCounts = new HashMap<LetoPeriodType, Long>(types.length);
        Map<LetoPeriodType, Long> periodsStartDay = new HashMap<LetoPeriodType, Long>(types.length);
        Map<LetoPeriodType, LetoPeriodStructure>
        periodsStructures = new HashMap<LetoPeriodType, LetoPeriodStructure>(types.length);
        
        for (int i =0; i < types.length; i++) {
            periods.put(types[i], new Long(0));           periodAbsoluteCounts.put(types[i], new Long(0));
            periodsStartDay.put(types[i], new Long(0));   
        }
        
        LetoPeriodType currentType = types[types.length - 1];
        LetoPeriodStructure[] structures = currentType.getPossibleStructures();
        if (structures == null || structures.length <= 0) {
            throw new LetoException("This calendar does not define any structure for the period type \"" 
                  + currentType.getName() + ", so it is not defined how long in days this period could be.");
        }
        if (structures.length > 1) {
            throw new LetoException("The biggest possible period type \"" + currentType.getName() 
                  + "\" in this calendar has " + structures.length 
                  + " possible structures, but just one was expected. It is not defined which one should be used.");
        }
        
        long daysElapsed = 0;
        
        LetoPeriodStructure structure = structures[0];
        long value = days / structure.getTotalLengthInDays();
        days = days % structure.getTotalLengthInDays();
        daysElapsed = value * structure.getTotalLengthInDays();
        increaseCount(periods, structure, value);
        increaseAbsolutePeriodCounts(periodAbsoluteCounts, structure, value);
        periodsStartDay.put(structure.getPeriodType(), daysElapsed);
        periodsStructures.put(structure.getPeriodType(), structure);
        
        while ((structures = structure.getSubPeriods() ) != null) {
            if (structures.length <= 0) {
                break;
            }
            for (int i = 0; i < structures.length; i++) {
                structure = structures[i];
                if (structure.getTotalLengthInDays() > days) {
                    periodsStartDay.put(structure.getPeriodType(), daysElapsed);
                    periodsStructures.put(structure.getPeriodType(), structure);
                    break;
                } else {
                    
                    days = days - structure.getTotalLengthInDays();
                    daysElapsed = daysElapsed + structure.getTotalLengthInDays();
                    
                    increaseCount(periods, structure, 1);
                    increaseAbsolutePeriodCounts(periodAbsoluteCounts, structure, 1);
                }
            }
        }
        LetoPeriod[] reslt = new LetoPeriod[types.length];
        for (int i = 0; i < types.length; i++) {
            LetoPeriodType type = types[i];
            Long countLong = periods.get(type);
            long count = 0;
            if (countLong != null) {
                count = countLong.longValue();
            }
            LetoPeriodBean bean = new LetoPeriodBean();
            bean.setNumber(count);
            bean.setAbsoluteNumber(periodAbsoluteCounts.get(type));
            bean.setType(type);
            bean.setActualName("" + count);
            bean.setStartAtDaysAfterEpoch(periodsStartDay.get(type));
            bean.setStructure(periodsStructures.get(type));
            reslt[i] = bean;
        }
        return reslt;
    }
    
    private void increaseCount(Map<LetoPeriodType, Long> periods, LetoPeriodStructure structure, long value) {
        Long periodCount = periods.get(structure.getPeriodType());
        if (periodCount == null) {
            periodCount = new Long(value);
        } else {
            periodCount = new Long(periodCount.longValue() + value);
        }
        periods.put(structure.getPeriodType(), periodCount);
    }
    
    private void increaseAbsolutePeriodCounts(Map<LetoPeriodType, Long> periodAbsoluteCounts, 
                                        LetoPeriodStructure structure, 
                                        long value) {
        LetoPeriodType[] types = getCalendarPeriodTypes();
        for (int j = 0; j < types.length; j++) { 
            LetoPeriodType type = types[j];
            long totalCount = structure.getTotalLengthInPeriodTypes(type);
            Long sumLong = periodAbsoluteCounts.get(type);
            if (sumLong == null) {
                sumLong = new Long(totalCount * value);
            } else {
                sumLong = new Long(sumLong.longValue() + (totalCount * value) );
            }
            periodAbsoluteCounts.put(type, sumLong);
        }
    }
    
    /**
     * Given the representation of the date by periods, this method calculates the number of days since the 
     * start of the calendar.
     * @param periods An array of periods.
     * @return The number of days since the start of the calendar.
     * @throws LetoException If there is some unrecoverable error during calculation.
     */
    protected long calculateDaysFromPeriods(LetoPeriod[] periods) throws LetoException {
        long days = 0;
        int len = periods.length;
        for (int periodIndex = len-1; periodIndex >= 0; periodIndex--) {
            LetoPeriod period = periods[periodIndex];
            long number = period.getNumber();
            
            LetoPeriodStructure structure = period.getStructure();
            long totalLengthInDays = structure.getTotalLengthInDays();
            
            days += (number * totalLengthInDays); 
            
        }
        
        return days;
    }
    
    public String checkCorrectness() {
        return LetoCorrectnessChecks.checkCorrectness(getCalendarPeriodTypes(), this);
    }
}