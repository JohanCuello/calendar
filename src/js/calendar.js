(function($) {
    $.fn.calendar = function(options) {
        var self = this;

        var settings = $.extend({
            startDate: new Date(),
            numDays: 1
        }, options);
        settings.endDate = addDays(settings.startDate, settings.numDays - 1);

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];
        var acum = 0;

        function render(container) {
            var calendarContainer = $("<div class='cal'></div>");
            var cDate = settings.startDate;
            var cDay = cDate.getDate();
            var cMonth = cDate.getMonth();
            var cYear = cDate.getFullYear();
            var counter = 0;
            var monthNumber = getMonthDiff(settings.startDate, settings.endDate);
            calendarContainer.append(getWeekHeader());

            do {
                calendarContainer.append(getMonthElement(cYear, cMonth, cDay));

                counter++;
                var cDay = 1;
                if (cMonth < 11) {
                    cMonth = cMonth + 1;
                } else {
                    cMonth = 0;
                    cYear = cYear + 1;
                }

            } while (counter <= monthNumber);
            container.append(calendarContainer);
        }

        function getMonthElement(year, month, day) {

            var daysInMonth = getDaysInMonth(year, month);
            var date = new Date(year, month, day);
            var cDayOfWeek = date.getDay();
            var isWeekend = false;
            var monthContainer = $("<div class='cal-m'></div>");

            monthContainer.append(getMonthHeader(months[month], year));

            var d = day
            var weekContainer = $("<div class='cal-w'></div>");
            weekContainer.append(getInvalidDaysElements(cDayOfWeek));
            monthContainer.append(weekContainer);
            do {
                cDayOfWeek = date.getDay();
                isWeekend = (cDayOfWeek == 0 || cDayOfWeek == 6);

                if (!weekContainer || weekContainer.children().length >= 7) {
                    weekContainer = $("<div class='cal-w'></div>");
                    monthContainer.append(weekContainer);
                }
                weekContainer.append(getDayElement(d, isWeekend));
                d++;
                acum++;
                date = addDays(date, 1);
            } while (d <= daysInMonth && acum < settings.numDays);
            var invalidDays = invalidDays = Math.abs(date.getDay() - 7);
            if (cDayOfWeek != 6)
                weekContainer.append(getInvalidDaysElements(invalidDays));
            return monthContainer;
        }

        function getDayElement(date, isWeekend) {
            var style = isWeekend ? "cal-d cal-we" : "cal-d"
            return "<div class='" + style + "'>" + date + "</div>";
        }

        function getInvalidDaysElements(invalidDays) {
            var html = "";
            for (let i = 0; i < invalidDays; i++) {
                html += "<div class='cal-invalid cal-d'>&nbsp;</div>";
            }
            return html;
        }

        function getWeekHeader() {
            var html = "<div class='cal-w-header'>";
            for (var index = 0; index < days.length; index++) {
                var cday = days[index];
                html += "<div class='cal-d-header'>" + cday[0] + "</div>";
            }
            html += "</div>";
            return html;
        }

        function getMonthHeader(monthName, year) {
            return "<div class='cal-m-header'>" + monthName + " " + year + "</div>";
        }


        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function getMonthDiff(startDate, endDate) {
            var months;
            months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
            months -= startDate.getMonth();
            months += endDate.getMonth();
            return months <= 0 ? 0 : months;
        }

        function getDaysInMonth(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }

        self.each(function() {
            var element = $(this);
            element.empty();
            render(element);
        });
        return self;
    }
})(jQuery);