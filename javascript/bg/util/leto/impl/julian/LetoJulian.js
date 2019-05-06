
function LetoJulian() {

    
    // Please note that the Julian calendar starts at   719164 days before Java Epoch so 1 January 1 year is on Sat
    // While the Gregorian calendar starts 2 days later 719162 days before Java Epoch so 1 January 1 year is on Mon
    // The switch between the two calendar has been first initiated by papa Gregory 
    // It has taken place on 1582 year, where 
    //     4-th of October 1582 ( Thursday)    was followed by [Julian]
    //    15-th of October 1582 (Friday)                       [Gregorian]
    // In Bulgaria the chenge was introduced on 1916 where
    //    31-st of March 1916 (Thursday) was followed by       [Julian]
    //    14-th of April 1916 (Friday)                         [Gregorian]
    // 
    // Leap year calculation in Julian calendar is very simple. Every year that can be devided by 4 is a leap year 
    // and there is 29-th of February in that year. 
    //
    // In Gregorian calendar, year that can be devided by 100 are not leap unless, they can be devided by 400.
    //
    this.START_OF_CALENDAR_BEFORE_JAVA_EPOCH = 719164; // In days.
    
    /**
     * All inheriting classes should define the beginning of their calendar in days before the java EPOCH. 
     * @return The beginning of calendar in days before java EPOCH.
     */
    this.startOfCalendarInDaysBeforeJavaEpoch = function() {
        return this.START_OF_CALENDAR_BEFORE_JAVA_EPOCH;
    }
    
    
    // -------------------------------------------------------------------------------------------//
    //                                 S T R U C T U R E S                                        //
    // -------------------------------------------------------------------------------------------//
    
    this.DAY = new LetoPeriodStructureBean(LocaleStrings._day_, 1, null); 
    
    this.MONTH_28_DAYS = 
        new LetoPeriodStructureBean(LocaleStrings._month_28_, 28, 
            new Array (
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,  
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY
            )
        ); 
    this.MONTH_29_DAYS = 
        new LetoPeriodStructureBean(LocaleStrings._month_29_, 29, 
            new Array (
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,  
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY
            )
        );
    this.MONTH_30_DAYS = 
        new LetoPeriodStructureBean(LocaleStrings._month_30_, 30, 
            new Array (
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,  
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY
            )
        );
    this.MONTH_31_DAYS = 
        new LetoPeriodStructureBean(LocaleStrings._month_30_, 31, 
            new Array (
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,  
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,
                DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY, DAY,
                DAY
            )
        );
    
    var JANUARY      = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._january_);
    var FEBRUARY_28  = new LetoGregorianMonth(MONTH_28_DAYS, LocaleStrings._february_);
    var FEBRUARY_29  = new LetoGregorianMonth(MONTH_29_DAYS, LocaleStrings._february_);
    var MARCH        = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._march_);
    var APRIL        = new LetoGregorianMonth(MONTH_30_DAYS, LocaleStrings._april_);
    var MAY          = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._may_);
    var JUNE         = new LetoGregorianMonth(MONTH_30_DAYS, LocaleStrings._june_);
    var JULY         = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._july_);
    var AUGUST       = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._august_);
    var SEPTEMBER    = new LetoGregorianMonth(MONTH_30_DAYS, LocaleStrings._september_);
    var OCTOBER      = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._october_);
    var NOVEMBER     = new LetoGregorianMonth(MONTH_30_DAYS, LocaleStrings._november_);
    var DECEMBER     = new LetoGregorianMonth(MONTH_31_DAYS, LocaleStrings._december_);
    
    this.YEAR = 
        new LetoPeriodStructureBean(LocaleStrings._year_non_leap_, 365, 
            new Array ( 
                JANUARY,        // January 
                FEBRUARY_28,    // February
                MARCH,          // March 
                APRIL,          // April 
                MAY,            // May 
                JUNE,           // June 
                JULY,           // July 
                AUGUST,         // August  
                SEPTEMBER,      // September
                OCTOBER,        // October 
                NOVEMBER,       // November
                DECEMBER        // December
            )
        );
    this.YEAR_LEAP = 
        new LetoPeriodStructureBean(LocaleStrings._year_leap_, 366, 
            new Array ( 
                JANUARY,        // January 
                FEBRUARY_29,    // February
                MARCH,          // March 
                APRIL,          // April 
                MAY,            // May 
                JUNE,           // June 
                JULY,           // July 
                AUGUST,         // August  
                SEPTEMBER,      // September
                OCTOBER,        // October 
                NOVEMBER,       // November
                DECEMBER        // December
            )
        );
    
    this.YEARS_4_LEAP = 
        new LetoPeriodStructureBean(LocaleStrings._years4_, 1461, 
            new Array (
                YEAR, YEAR, YEAR, YEAR_LEAP
            )
        );

    // -------------------------------------------------------------------------------------------//
    //                                   T Y P E S                                                //
    // -------------------------------------------------------------------------------------------//
    
    this.DAY_PERIOD_TYPE = 
                    new LetoPeriodTypeBean(LocaleStrings._day_, LocaleStrings._day_description_, // Day - 1 day period 
                        new Array(DAY)
                    );
    
    this.MONTH_PERIOD_TYPE =         
        new LetoPeriodTypeBean(LocaleStrings._month_, LocaleStrings._monthjugr_description_, // Month - 28, 29, 30 or 31 days period 
            new Array (
                JANUARY  ,
                FEBRUARY_28, 
                FEBRUARY_29 ,
                MARCH       ,
                APRIL       ,
                MAY         ,
                JUNE        ,
                JULY        ,
                AUGUST      ,
                SEPTEMBER   ,
                OCTOBER     ,
                NOVEMBER     ,
                DECEMBER)
            );
    
    this.YEAR_PERIOD_TYPE =         
        new LetoPeriodTypeBean(LocaleStrings._year_, LocaleStrings._year_, // Year - Year 
            new Array ( YEAR, YEAR_LEAP )
        );
    
    this.YEARS_4_PERIOD_TYPE =         
        new LetoPeriodTypeBean(LocaleStrings._years4_, LocaleStrings._years4_, // 4 Years  - 4 Years 
            new Array ( YEARS_4_LEAP )
        );

    this.TYPES = new Array (
            DAY_PERIOD_TYPE, 
            MONTH_PERIOD_TYPE,
            YEAR_PERIOD_TYPE,
            YEARS_4_PERIOD_TYPE, 
    );

    
    this.getCalendarPeriodTypes = function () {
        return TYPES;
    }
    
    static  {
      //----------------------------
      //Day
      var dayLengths = new Map();
      LetoJulian.DAY.setTotalLengthInPeriodTypes(dayLengths);
      //----------------------------
      //Month
      var month_28_DAYSLengths = new Map();
      month_28_DAYSLengths.put(LetoJulian.DAY_PERIOD_TYPE, 28);
      LetoJulian.MONTH_28_DAYS.setTotalLengthInPeriodTypes(month_28_DAYSLengths);
      //----------------------------
      //Month
      var month_29_DAYSLengths = new Map();
      month_29_DAYSLengths.put(LetoJulian.DAY_PERIOD_TYPE, 29);
      LetoJulian.MONTH_29_DAYS.setTotalLengthInPeriodTypes(month_29_DAYSLengths);
      //----------------------------
      //Month
      var month_30_DAYSLengths = new Map();
      month_30_DAYSLengths.put(LetoJulian.DAY_PERIOD_TYPE, 30);
      LetoJulian.MONTH_30_DAYS.setTotalLengthInPeriodTypes(month_30_DAYSLengths);
      //----------------------------
      //Month
      var month_31_DAYSLengths = new Map();
      month_31_DAYSLengths.put(LetoJulian.DAY_PERIOD_TYPE, 31);
      LetoJulian.MONTH_31_DAYS.setTotalLengthInPeriodTypes(month_31_DAYSLengths);
      //----------------------------
      //Year
      var yearLengths = new Map();
      yearLengths.put(LetoJulian.DAY_PERIOD_TYPE, 365);
      yearLengths.put(LetoJulian.MONTH_PERIOD_TYPE, 12);
      LetoJulian.YEAR.setTotalLengthInPeriodTypes(yearLengths);
      //----------------------------
      //Year
      var yearLeapLengths = new Map();
      yearLeapLengths.put(LetoJulian.DAY_PERIOD_TYPE, 366);
      yearLeapLengths.put(LetoJulian.MONTH_PERIOD_TYPE, 12);
      LetoJulian.YEAR_LEAP.setTotalLengthInPeriodTypes(yearLeapLengths);
      //----------------------------
      //4 Years
      var years4LeapLengths = new Map();
      years4LeapLengths.put(LetoJulian.DAY_PERIOD_TYPE, 1461);
      years4LeapLengths.put(LetoJulian.MONTH_PERIOD_TYPE, 48);
      years4LeapLengths.put(LetoJulian.YEAR_PERIOD_TYPE, 4);
      LetoJulian.YEARS_4_LEAP.setTotalLengthInPeriodTypes(years4LeapLengths);
    }
    
    // Testing -----------------------------------------------------------------------------------------------------
    
    this.getStructureName = function (type) {
        var typeStr = "";
        if (type == LetoJulian.DAY) {
            typeStr = "LetoGregorian.DAY";
        } else if (type == LetoJulian.MONTH_28_DAYS) {
            typeStr = "LetoGregorian.MONTH_28_DAYS";
        } else if (type == LetoJulian.MONTH_29_DAYS) {
            typeStr = "LetoGregorian.MONTH_29_DAYS";
        } else if (type == LetoJulian.MONTH_30_DAYS) {
            typeStr = "LetoGregorian.MONTH_30_DAYS";
        } else if (type == LetoJulian.MONTH_31_DAYS) {
            typeStr = "LetoGregorian.MONTH_31_DAYS";
        } else if (type == LetoJulian.YEAR) {
            typeStr = "LetoGregorian.YEAR";
        } else if (type == LetoJulian.YEAR_LEAP) {
            typeStr = "LetoGregorian.YEAR_LEAP";
        } else if (type == LetoJulian.YEARS_4_LEAP) {
            typeStr = "LetoGregorian.YEARS_4_LEAP";
        } else {
            typeStr = "ERROR (" + type + ", " + type.getPeriodType().getName(Locale.ENGLISH) + ") ";
        }
        return typeStr;
    }
    
    this.getTypeName = function (type) {
        var typeStr = "";
        if (type == LetoJulian.DAY_PERIOD_TYPE) {
            typeStr = "LetoGregorian.DAY_PERIOD_TYPE";
        } else if (type == LetoJulian.MONTH_PERIOD_TYPE) {
            typeStr = "LetoGregorian.MONTH_PERIOD_TYPE";
        } else if (type == LetoJulian.YEAR_PERIOD_TYPE) {
            typeStr = "LetoGregorian.YEAR_PERIOD_TYPE";
        } else if (type == LetoJulian.YEARS_4_PERIOD_TYPE) {
            typeStr = "LetoGregorian.YEARS_4_PERIOD_TYPE";
        } else {
            typeStr = "ERROR (" + type + ", " + type.getName(Locale.ENGLISH) + ") ";
        }
        return typeStr;
    }
    
    this.testPeriod = function (structure) {
        println("//----------------------------");
        println("//" + structure.getPeriodType().getName("en"));
        var lengths = LetoCorrectnessChecks.calcuateLengthInPeriodTypes(structure);
        var keySet = lengths.keySet();
        var iterator = keySet.iterator();
        
        var structureStr = getStructureName(structure);
        var structureString = structureStr.replace('.', '_');
        structureString = structureString + "Lengths";
        
        
        println("Map<LetoPeriodType, Long> " + structureString + " = new HashMap<LetoPeriodType, Long>(" + keySet.size() 
                        + ");");
        while(iterator.hasNext()) {
            var type = iterator.next();
            var count = lengths.get(type);
            //println("" + type.getName() + ": " + (count == null ? 0 : count) );
            var typeString = getTypeName(type);
            println(structureString + ".put(" + typeString + ", new Long(" + (count == null ? 0 : count )+ "));");
        }
        println(structureStr + ".setTotalLengthInPeriodTypes(" + structureString + ");");
        
    }
    
    this.main = function (argv) {
        testPeriod(LetoJulian.DAY);
        testPeriod(LetoJulian.MONTH_28_DAYS);
        testPeriod(LetoJulian.MONTH_29_DAYS);
        testPeriod(LetoJulian.MONTH_30_DAYS);
        testPeriod(LetoJulian.MONTH_31_DAYS);
        testPeriod(LetoJulian.YEAR);
        testPeriod(LetoJulian.YEAR_LEAP);
        testPeriod(LetoJulian.YEARS_4_LEAP);
    }

    this.getNameTranslationIndex = function() {
        return LocaleStrings._julian_;
    }
    
    this.getDescriptionTranslationIndex = function () {
        return LocaleStrings._julian_;
    }

    this.getStartOfCalendarBeforeUnixEpoch = function () {
        return START_OF_CALENDAR_BEFORE_JAVA_EPOCH;
    }

}

if (module != null && module.exports != null)  {
  module.exports = LetoJulian
}

