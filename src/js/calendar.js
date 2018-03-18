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

        function render(container) {
            var calendarContainer = $("<div class='cal'></div>");
            var monthContainer = null;
            var weekContainer = null;

            var cDate = settings.startDate;
            var cMonth = cDate.getMonth();
            var isRenderMonth = true;
            var counter = 0;

            calendarContainer.append(getWeekHeader());

            do {

                if (isRenderMonth) {
                    isRenderMonth = false;

                    //render month
                    monthContainer = $("<div class='cal-m'></div>");
                    monthContainer.append(getMonthHeader(months[cMonth]));
                    //load month to container
                    calendarContainer.append(monthContainer);
                }
                //render week
                if (!weekContainer || weekContainer.children().length >= 7) {
                    weekContainer = $("<div class='cal-w'></div>");
                    monthContainer.append(weekContainer);
                }

                var cDay = cDate.getDay();
                var invalidDays = 0;
                var isWeekend = (cDay == 0 || cDay == 6);

                if (cDate.getTime() === settings.startDate.getTime()) {
                    invalidDays = cDay;
                    weekContainer.append(getInvalidDaysElements(invalidDays));
                }
                if (cDate.getTime() === settings.endDate.getTime()) {
                    invalidDays = Math.abs(cDate.getDay() - 6);
                    weekContainer.append(getDayElement(cDate.getDate(), isWeekend));
                    weekContainer.append(getInvalidDaysElements(invalidDays));
                    break;
                }
                weekContainer.append(getDayElement(cDate.getDate(), isWeekend));

                counter++;
                cDate = addDays(settings.startDate, counter);
                var tMonth = cDate.getMonth();
                if (cMonth != tMonth) {
                    cMonth = tMonth;
                    isRenderMonth = true;
                }

            } while (counter < settings.numDays);
            container.append(calendarContainer);
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

        function getMonthHeader(monthName) {
            return "<div class='cal-m-header'>" + monthName + "</div>";
        }


        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        self.each(function() {
            var element = $(this);
            render(element);
        });
        return self;
    }
})(jQuery);