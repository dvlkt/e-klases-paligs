import { setLoadingMessageBlock, showLoadingSpinner, ShowMask } from "@/assets/js/loading_mask";

var historyAPISupported = !!(window.history && history.pushState);
var isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent); // primitīvs boolean, bet ar to pietiek. -kp

$(function () {

    var isFamily = document.location.href.indexOf("Family") !== -1;
    var isFamilyMail = isFamily && document.location.href.indexOf("Mail") !== -1;
    var isFamilyForum = isFamily && document.location.href.indexOf("Forum") !== -1;

    if (isFamilyMail || isFamilyForum) {
        $(".current-page.visible-xs.mobile-page-title")[0].setAttribute("style", "display: none!important");
    }

    $(".entry-title").on("click", function () {
        $(this).parent().toggleClass("open");
    });

    $("#overlay").addClass("hidden");


    $(document).on("click", ".open-mark-file", function(e) {
        e.preventDefault();

        setLoadingMessageBlock();
        $("#modal-mark").modal();


        if (typeof markFileModalCloseTag !== undefined) {
            $(".mark-file-modal-body").prepend(markFileModalCloseTag);
        }

        $(".mark-file-modal-body").load(markFileUrl + "?MarkId=" + $(this).data("id"), function (response, status, xhr) {
            if (status === "error" && xhr.status === 409) {
                $(".loadingMessageBlock").hide();

                var container = $("<div></div>");
                var heading = $("<h1></h1>").text("Atzīme mainīta");
                var link = $("<a></a>").text("Atjaunot datus");
                heading.attr("style", "background: white; margin-right: 0;");
                link.attr("style", "text-align: center; color: #009AE3; cursor: pointer; display: block; line-height:40px;");
                link.attr("id", "refreshMarkLink");

                container.append(heading, link);
                $(".modal-body").append(container);
            }
        });

        //Izkomentēts un jādzēš, jo: Bug 319: Sentry kļūda cannot ready property 'style' of null
        //window.refreshAdboxBaners();

    });

    $(document).on("click", "#refreshMarkLink", function () {
        window.location.href = markToInvalidateMarksCache;
    });


    // Pārlādē Adbox aktīvos banerus lapā.
    // Šo var likt pie jebkura elementa.
    // Izkomentēts un jādzēš, jo: Bug 319: Sentry kļūda cannot ready property 'style' of null
    //$(document).on("click", ".refresh-adbox", function() {
    //    window.refreshAdboxBaners();
    //});


    //atver stundu laiku sarakstu
    $(document).on("click",
        ".open-lesson-times",
        function(e) {
            e.preventDefault();
            //console.log("asd");
            openLessonTimesModel();
        });

    //atver dienasgrāmatas drukas skatu
    $(document).on("click",
        ".print-diary",
        function(e) {
            e.preventDefault();

            var printableContentBlock = $(".student-journal-lessons div[data-print]").first();
            var printUrl = printableContentBlock.data("printurl");
            var lessonTimesUrl = printableContentBlock.data("lessontimesurl");
            openLocalPrintLayout(printableContentBlock, printUrl, lessonTimesUrl);
        });


    //atver drukas skatu (implementēts sekmju izrakstā)
    //var izmantot citur!
    $(document).on("click",".print-button",
        function (e) {
            e.preventDefault();
            var printableContentBlock = $("div[data-print]").first(); //ja vairāki, tad izmanto tikai vienu - pirmo!
            var printUrl = printableContentBlock.data("printurl");
            openLocalPrintLayout(printableContentBlock, printUrl);
        });



    // Atver apzīmējumu un saīsinājumu formu.
    $(".open-terms-and-abbreviations").on("click",
        function(e) {
            e.preventDefault();

            openTermsAndAbbreviationsModal($(this).data("url"));
        });



    $(".custom-select2-redirect").bind("select2:select", function (e) {
        showLoadingSpinner(e);
        window.location.href = this.value;
    });

    //Universāls bloku pārslēgs.
    //Pie linka jāpieliek data-hide="<css-klase>" un data-show="<css-klase>"!
    $(".switcher a").on("click", function (e) {


        //Šim loģika tāda. Ja pie switcher ir pievienots href, tad nostrādā links. Ja nav pievienots, tad strādā switcher-is.
        var thisHref = $(this).attr("href");
        if (thisHref.length) {
            window.location.href = thisHref;
        } else {


            e.preventDefault();

            var $this = $(this),
                show = $this.data("show"),
                hide = $this.data("hide");

            $this.parent().find("a").removeClass("active");
            $this.addClass("active");

            $("." + hide).hide();
            $("." + show).removeClass("hidden").show();
        }

    });


    //visām kļūdām, kas tiek uzģenerētas ar Html.ValidationMessageFor palīdzību
    var fieldValidationErrors = $(".error-msg .field-validation-error");
    var fieldValidationErrorsLength = fieldValidationErrors.length;
    for (var i = 0; i < fieldValidationErrorsLength; i++) {
        var $thisObject = $(fieldValidationErrors[i]); // jquery object
        setBootstrapRowErrorClassForValidationMessage($thisObject);
    }
    //$(".error-msg .field-validation-error").each(setBootstrapRowErrorClassForValidationMessage);

    $.fn.datepicker.defaults.language = "lv";
    $.fn.datepicker.defaults.endDate = "+3650d";
    $.fn.datepicker.defaults.startDate = "-3650d";
    $.fn.datepicker.dates.lv = {
        days: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"],
        daysShort: ["Sv", "P", "O", "T", "C", "Pk", "S"],
        daysMin: ["Sv", "P", "O", "T", "C", "Pk", "S"],
        months: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "Šodiena",
        clear: "Notīrīt",
        format: "dd.mm.yyyy.",
        titleFormat: "MM yyyy",
        weekStart: 1,
    };

    initializePeriodDatePicker();

    $("[data-scrollto]").on("click", function (e) {
        e.preventDefault();

        scrollTo($(this).data("scrollto"));
    });




    //DIV elementiem ar scrollbar, izolē scroll-ēšanu tikai šim elementam
    var scrollableDivs = $(".widget-content-viewport");
    scrollableDivs.each(function () {
        var toolbox = $(this),
            height = toolbox.height(),
            scrollHeight = toolbox.get(0).scrollHeight;

        toolbox.off("mousewheel").on("mousewheel", function (event) {
            var blockScrolling = this.scrollTop === scrollHeight - height && event.deltaY < 0 || this.scrollTop === 0 && event.deltaY > 0;

            return !blockScrolling;
        });
    });


    // data-redirecturl atribūta izmantošana pāradresēšanā
    $("[data-redirecturl]").on("touchend click", function () {
        if (!$(this).hasClass("disabled"))
            window.location.href = $(this).data("redirecturl");
    });


    // Atslēdz visa veida kendo UI animācijas efektus.
    if (typeof kendo !== "undefined") {
        kendo.effects.disable();
    }

    // Atslēdz visa veida Bootstrap UI animācijas efektus.
    // Ref. http://getbootstrap.com/javascript/#disabling-transitions
    if (typeof $.support !== "undefined") {
        $.support.transition = false;
    }




    // Bērnu profila pārslēgs uz Select2 bāzes
    // Datu objektam nomapo/pievieno id-us un pareizus nosaukumus (nepieciešam Select2 normālai darbībai)
    var studentsSelectorDataObj;
    if (typeof student_selector_data !== "undefined") {
        studentsSelectorDataObj = $.map(student_selector_data,
            function(obj) {
                obj.id = obj.id || obj.Id; // izveido  jaunu propertiju id un mapo uz SearchInputType
                obj.text = obj.text || obj.Name; // mapo text uz Text

                return obj;
            });
    } else {
        studentsSelectorDataObj = { "id": "0", "text": "" };
    }

    var studentsSelector = $(".select-student");

    if(studentsSelector.length > 0){
        // Inicializē skoleņa pārslēga dropdown
        studentsSelector.select2({
            minimumResultsForSearch: Infinity,
            data: studentsSelectorDataObj,
            width: "100%" // NOTE! Šis ir ļoti svarīgi, pretējā gadījumā dažos pārlūkos sabrūk dizains.


            // NOTE: Šeit varētu implementēt http://stackoverflow.com/questions/2534803/string-format-in-javascript#answer-2534828
            // taču grūti būtu realizēt if() nosacījumus templat-ē.
            ,templateSelection: function(dataObject) {
                return "<div class=\"student-selector-option\"><span class=\"name\">" + dataObject.Name + "</span><small>" + dataObject.Description + "</small>" + (dataObject.RenderNotification ? "<div class=\"count\">" + dataObject.NotificationCount + "</div>" : "") + "</div>";
            }

            ,templateResult: function(dataObject) {
                return "<div class=\"student-selector-option\"><span class=\"name\">" + dataObject.Name + "</span><small>" + dataObject.Description + "</small>" + (dataObject.RenderNotification ? "<div class=\"count\">" + dataObject.NotificationCount + "</div>" : "") + "</div>";
            }

            , escapeMarkup: function (m) { //Šis ir svarīgi, lai varētu parsēt templateSelection un templateResult esošo HTML!
                return m;
            },
        });


        // Uzliek selected vērtību
        studentsSelector.val(student_selector_value).trigger("change.select2");

        // Dropdown izvēlnei title nav vajadzīgi, jo nav garu nosaukumu.
        $(".student-selector select").removeAttr("title");

        // Redirektē uz attiecīgā skolēna profilu
        studentsSelector.on("select2:opening", function () {
            var fieldContainer = $("#student_selector_data");
            var form = fieldContainer.closest("form");
            window.location.href = form.attr("action");

        });
    }

    // Mobilajā menu bērnu profilu maiņas links
    if (typeof urlToUserLoginProfileSelection !== "undefined") {
        $(".mobile-student-profile-switcher").on("click", function () {
            ShowMask();
            window.location.href = urlToUserLoginProfileSelection;
        });
    }

    if (historyAPISupported) {
        history.replaceState({ marked: true }, null, null); //skat. komentāru pie pushState()
    }
});


$(document).on("shown.bs.modal",
    function(e) {

        /* Kad modālais parādīts, sagatavo vēstures API, lai ar BACK netiktu pārlādēta parent lapa. */
        if (historyAPISupported) {
            history.pushState({ marked: true }, null, location.href);
            //"marked" nepieciešams priekš iphone safari 8/Android 4.3, lai pēc lapas ielādes neaizvērtos automātiski atvērtie modālie logi!
            // ref. https://stackoverflow.com/questions/10756893/how-to-ignore-popstate-initial-load-working-with-pjax#10765676
        }

        // Aizver mobilo menu
        $(".toggle-mobile-menu").removeClass("open");
        $("body").removeClass("mobile-menu-open");


        // Aktīvajā modālajā logā, skrollējot tiek noņemts fokuss no teksta laukiem.
        var thisLayout = findBootstrapEnvironment();
        if (thisLayout === "xs") {


            // Aizver onscreen klaviatūru (defokusē input lauku, ja tāds ir iefokusēts).
            $(".modal-open").on("touchmove", function() {
                isIOS ? $(".modal.in").focus() : document.activeElement.blur();
            //blur() uz Android-iem strādā eleganti. Uz iOS sabrūk modālais...
            });


        }

        if (e.namespace === "bs.modal") {

            // NOTE: namespace pārbaude nepieciešama, citādāk konfliktē ar datepicker inicializāciju: https://github.com/uxsolutions/bootstrap-datepicker/issues/978
            // Rezultātā pazūd lapas scrollbar, pat ja nav neviena modālā.
            //$('body').css("overflow", "hidden");
            //$(".modal.in").css("overflow", "hidden").addClass("modal-nopadding");

        }

    });



/* Paslēpj body un modālā loga scrollbar. Scrollbar tiek rādīts, ja modālais nesatilpst ekrānā. */

$(window).on("show.bs.modal", function (e) {
    if (e.namespace === "bs.modal") {

        // NOTE: namespace pārbaude nepieciešama, citādāk konfliktē ar datepicker inicializāciju: https://github.com/uxsolutions/bootstrap-datepicker/issues/978
        // Rezultātā pazūd lapas scrollbar, pat ja nav neviena modālā.
        $("body").css("overflow", "hidden");
        $(".modal.in").css("overflow", "hidden").addClass("modal-nopadding");

    }
});


/* Aizverot modālo, pieslēdz scrollbarus. */
$(window).on("hide.bs.modal", function (e) {
    if (e.namespace === "bs.modal") {
        $("body").css("overflow", "auto");
    }
});



$(window).on("popstate", function (e) {
    if (e.originalEvent.state == null) return;

    if (!e.originalEvent.state.marked) return;

    $(".modal").modal("hide");
});




$.ajaxSetup({
    //traditional: true,
    error: function (jqXHR, exception) {

        //lietotāja sesijas ir beigusies
        if (jqXHR.status === 401 || jqXHR.status === 403) {

            //console.log("asd");
            //šitik debīls risinājums, jo IOS nepatīk parasts redirect
            $("<a/>", {
                "href": "",
                "class": "logout-a",
            }).appendTo("body");

            //window.location.href = window.location.href;
            setTimeout(function() {
                $(".logout-a")[0].click();
            }, 500);


        } else if (jqXHR.status === 500) {
            //document.write("");
            //document.write(data.responseText);
            $(".modal").modal("hide");
            $("#errorModal").modal();
        }

    },
});



// Generates tiny charts in Score card popup and students journal
function initTinyChartWithParams(element, chartItems, currentIndex) {

    /// <summary>
    /// Initializes the tiny chart with parameters.
    /// This is modified version of Aurum's initTinyChart() (src/common.js)
    /// </summary>
    /// <param name="element">The element.</param>
    /// <param name="chartItems">The chart items.</param>
    /// <param name="currentIndex">Index of the current.</param>
    /// <returns></returns>

    if (!(typeof chartItems === "object" && Array.isArray(chartItems))) {
        return false;
    }

    var tinygraph_series = [
        {
            data: chartItems,
            overlay: {
                gradient: "none",
            },
            gap: 1,
            border: {
                width: 0,
            },
            color: function (point) {
                if (currentIndex !== "" && point.index === parseInt(currentIndex)) {
                    return "#009AE3";
                } else {
                    return "#ACACAC";
                }
            },
            labels: {
                visible: false,
            },
        },
    ];

    element.kendoChart({
        transitions: false,
        chartArea: {
            margin: 0,
            padding: 0,
            background: "rgba(0, 0, 0, 0)",
        },
        categoryAxis: {
            margin: 0,
            padding: 0,
            labels: {
                visible: false,
            },
            line: {
                visible: false,
            },
            majorGridLines: {
                visible: false,
            },
        },
        valueAxis: {
            margin: 0,
            padding: 0,
            labels: {
                visible: false,
            },
            line: {
                visible: false,
            },
            majorGridLines: {
                visible: false,
            },
        },
        legend: {
            visible: false,
        },

        series: tinygraph_series,
    });
}

/* Šī ir jaunā versija - ar vietām samainītām X, Y asīm, t.i. ar horizontāliem stabiņiem. */
function initHorizontalTinyChartWithParams(element, chartItems, currentIndex) {

    /// <summary>
    /// Initializes the tiny chart with parameters.
    /// This is modified version of Aurum's initTinyChart() (src/common.js)
    /// </summary>
    /// <param name="element">The element.</param>
    /// <param name="chartItems">The chart items.</param>
    /// <param name="currentIndex">Index of the current.</param>
    /// <returns></returns>


    if (!(typeof chartItems === "object" && Array.isArray(chartItems))) {
        return false;
    }


    //Nepieciešams, lai uzturētu konsekventu stabiņa biezumu gan pie liela, gan pie maza priekšmetu skaita.
    var potentialHeightOfRow = 5;
    var chartHeight = 0;

    $(".mark-card-inner-graph-descr").css("height", "100%").css("border-right", "none");
    $(".mark-card-inner-graph-image").css("height", "100%").css("border-left", "1px solid #ebebeb");

    if (chartItems.length > 0) {
        chartHeight = chartItems.length * potentialHeightOfRow;
    }

    var tinygraph_series = [
        {
            type: "bar",
            data: chartItems,
            overlay: {
                gradient: "none",
            },
            gap: 1,
            border: {
                width: 0,
            },
            color: function (point) {
                if (currentIndex !== "" && point.index === parseInt(currentIndex)) {
                    return "#009AE3";
                } else {
                    return "#ACACAC";
                }
            },
            labels: {
                visible: false,
            },
        },
    ];

    element.kendoChart({
        transitions: false,
        chartArea: {
            margin: 0,
            padding: 0,
            background: "rgba(0, 0, 0, 0)",
            height: chartHeight < 60 ? 60 : chartHeight,
        },
        plotArea: {
            //height: chartHeight,
            //margin: {
            //    top: 5,
            //    left: 5,
            //    right: 5,
            //    bottom: 5
            //}
        },
        categoryAxis: {
            margin: 0,
            padding: 0,
            labels: {
                visible: false,
            },
            line: {
                visible: true,
            },
            majorGridLines: {
                visible: false,
            },
            majorTicks: {
                visible: false,
            },
            //,notes: {}
        },
        valueAxis: {
            margin: 0,
            padding: 0,
            labels: {
                visible: false,
            },
            line: {
                visible: true,
            },
            majorGridLines: {
                visible: false,
            },
            majorTicks: {
                visible: false,
            },
        },
        legend: {
            visible: false,
        },

        series: tinygraph_series,
    });
}

function forEach(array, action) {
    /// <summary>
    /// Foreaches the specified array.
    /// </summary>
    /// <param name="array">The array.</param>
    /// <param name="action">The action.</param>
    /// <returns></returns>
    if (typeof array !== "undefined"
        &&
        array != null
        &&
        Object.prototype.toString.call(array) === "[object Array]") {

        var arrLength = array.length;
        for (var i = 0; i < arrLength; i++)
        {
            action(array[i]);
        }
    }
}



(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();

        var aLength = a.length;

        for (var i = 0; i < aLength; i++) {

            var that = a[i];

            if (o[that.name]) {
                if (!o[that.name].push) {
                    o[that.name] = [o[that.name]];
                }
                o[that.name].push(that.value || "");
            } else {
                o[that.name] = that.value || "";
            }
        }

        return o;
    };

})(jQuery);





//uzstāda kļūdu paziņojumus formai pēc ajax izsaukuma (strādā uz bootstrap formām)
function setErrorMessages(errors) {
    removeErrorMessages();

    for (var i = 0; i < errors.length; i++) {


        var inputRow = $("#" + errors[i].FieldId).closest(".form-input-row");



        inputRow.addClass("error");

        var fieldErrorContainer = inputRow.find(".error-container");


        $("<div/>", {
            "class": "error-msg",
            "html": errors[i].MessageText,
        }).appendTo(fieldErrorContainer);
    }
}

//noņem laukiem kļūdu paziņojumus (strādā uz bootstrap formām)
function removeErrorMessages() {
    $(".error-container").empty();
    $(".form-input-row").removeClass("error");
}




function openLessonTimesModel() {
    $(".lesson-times-modal").modal();
    setLoadingMessageBlock();

    $(".lesson-times-table").load(urlToToLessonTimes);
}


//visām kļūdām, kas tiek uzģenerētas ar Html.ValidationMessageFor palīdzību, bet tiek attēlotas izmantotjot bootstrap
//piemet parenta rindai error klasi, lai iekrāsojas input lauks
function setBootstrapRowErrorClassForValidationMessage(errorObj) {

    if (errorObj.html() === "")
        return false;

    errorObj.closest(".form-row").addClass("error");
}



function openTermsAndAbbreviationsModal(url) {

    var modalContainer = $(".terms-and-abbreviations-modal");
    var modalContent = $(".terms-and-abbreviations-modal-content");

    modalContainer.modal();

    setLoadingMessageBlock();

    modalContent.load(url,
        function () {
            //Ja ielādējamā lapa sautur <meta>, tātad tas nav partiāls skats, potenciāli beigusies sesija...
            if ($(this).find("meta").length > 0) {
                window.parent.location.href = "/";
            }
        });
}








//E-klasē grafiku inicializēšana atšķiras no Aurum izstrādes vides, tāpēc šī f-ja, ja nu kas, tiek override-ota.
function initTinyChart() {
    return;
}


function addLoadingMessageBlock(selector, text) {
    /// <summary>
    /// Pievieno ielādes pziņojumu (var būt teksts vai CSS3 animācija vai tmldz.).
    /// </summary>
    /// <param name="selector">The selector.</param>
    /// <returns></returns>
    var selectorLength = selector.length;

    var messageText = text || "Ielādējas...";

    for (var i = 0; i < selectorLength; i++) {
        var that = $(selector[i]); // jquery object
        if (!that.find(".loadingMessageBlock").length) { //animācijas versija iekš TFS nr. 6095
            that.append("<div class='loadingMessageBlock'>" + messageText + "<div class='loading-spinner'></div></div>");
        }
    }
}

function addLoadingAnimation(selector) {
    addLoadingMessageBlock(selector);
}

function loadScriptResources(resources, callBackFunc) {
    /// <summary>
    /// Loads additional script resources.
    /// Paredzēts, lai dinamiski ielādētu .js failus. Piemēram, var izmantot modālajos logos,
    /// lai parent lapā nebūtu jāielādē lieki .js resursi. .js tiek kešots. Pie veiksmīgas ielādes
    /// loga kontekstā, otro reizi skripti vairs netiek lādēti. Pēc veiksmīgas ielādes izsauc
    /// callBackFunc.
    /// Ref. http://stackoverflow.com/questions/25843842/css-animation-gets-hanged-while-script-load
    /// </summary>
    /// <param name="func">The function to execute after script is loaded.</param>
    /// <returns></returns>


    if (typeof resources === "undefined" || resources === null || resources.length === 0) {
        console.log("Can not run function without 'resources' input parameter!");
        return false;
    }

    //Ja tekošā loga kontekstā script resursi jau ir veiksmīgi ielādēti, tad tikai izsaukt f-ju.
    if (typeof window.scriptResourcesAreLoaded !== "undefined" && window.scriptResourcesAreLoaded === 1) {
        callBackFunc();
        return false;
    }

    $.ajaxSetup({
        cache: true,
    });


    $.getMultiScripts(resources).done(function () {
        window.scriptResourcesAreLoaded = 1;
        $(".animateLoading").remove();
        callBackFunc();
        //$.ajaxSetup({
        //    cache: false
        //});
    });

}

//A utility function that accepts any array of scripts for $.getScript()
$.getMultiScripts = function (arr, path) {
    var _arr = $.map(arr, function (scr) {
        return $.getScript((path || "") + scr);
    });

    _arr.push($.Deferred(function (deferred) {
        $(deferred.resolve);
    }));

    return $.when.apply($, _arr);
};

//Nepieciešams, lai noteiktu tekošo lietotāja layout.
//Paredzēts priekš bootstrap tour un tehniskā atbalsta formai.
function findBootstrapEnvironment() {
    var envs = ["xs", "sm", "md", "lg"],
        doc = window.document,
        temp = doc.createElement("div");

    doc.body.appendChild(temp);

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        temp.className = "hidden-" + env;

        if (temp.offsetParent === null) {
            doc.body.removeChild(temp);
            return env;
        }
    }
    return "";
}


function initializePeriodDatePicker() {

    var periodDatePicker = $(".datepicker-period");

    periodDatePicker.datepicker({
        format: "dd.mm.yyyy.",
        todayHighlight: true,
        orientation: "bottom",
        startDate: periodDatePicker.data("mindate"),
        endDate: periodDatePicker.data("maxdate"),
    }).on("changeDate", function (ev) {
        $(this).datepicker("hide");
    });

    periodDatePicker.focus(function () {
        periodDatePicker.blur(); //Lai mobilajās ierīcēs netraucētu klaviatūra.
    });


}




var generateLoaderDocument = function (winObj) {

    if (typeof winObj === "undefined") {
        winObj = window.open("", "printWindowEklase_" + new Date().getTime());
    }

    // Loaderis... redzams, ja liels atspoguļojamo datu apjoms.
    winObj.document.open();
    winObj.document.write("<!DOCTYPE html><html><head>");
    winObj.document.write("<title></title></head><body><div style=\"position: absolute; top: 50%; left: 50%; margin: auto;\"><span class=\"blink\" style=\"font-family: Arial, Verdana, sans-serif;\">Ielādējas...</span></div></body></html>");
    winObj.document.close();

};


/*
 * Uz drukas pogas klikšķi, atver parlūkā jaunu logu ar norādīto drukas layout un aizvieto attiecīgos blokus.
 *
 * Drukājamam content blokam jāpievieno šādi atribūti:
 *      data-print="1"
 *      data-printutl="@Model.<UrlToPrintLayout>"
 *
 *  lessonTimesUrl ir izveidots speciāli priekš ģv dienasgrāmatas drukas skata.
 *
 *
 */
var openLocalPrintLayout = function (contentBlockForPrint, routeUrlPrint, lessonTimesUrl) {

    contentBlockForPrint = contentBlockForPrint || $("div[data-print]").first();

    routeUrlPrint = routeUrlPrint || "#";

    //lessonTimesUrl = lessonTimesUrl || "#";

    var includeLessonTimes = typeof lessonTimesUrl !== "undefined" && lessonTimesUrl != null && lessonTimesUrl.length > 0;

    var printWin = null;

    try {
        //Ieliku try-catch blokā, jo kopš sentry.io pieslēgšanas, consolē ģenerēja "Cannot read property 'document' of null".
        printWin = window.open("", "printWindowEklase_" + new Date().getTime());
    } catch (e) {

    }

    if (printWin == null) {
        return;
    }

    //ja jādrukā liels content, tad šis ir pagaidu teksts, kamēr ielādē
    printWin.document.body.innerHTML = "<div style=\"position: absolute; top: 50%; left: 50%; margin: auto;\"><span class=\"blink\" style=\"font-family: Arial, Verdana, sans-serif;\">Ielādējas...</span></div>";

    var lessonTimesForPrint = "";


    var content = "";


    $.ajax({
        type: "GET",
        url: routeUrlPrint
        , async: false,
    }).done(function (html) {
        content = html;

        if (includeLessonTimes) {
            //Vēl viens AJAX izsaukums stundu laiku uzpildīšanai...
            $.ajax({
                type: "GET",
                url: lessonTimesUrl
                , async: false,
            }).done(function (htmlResponse) {
                lessonTimesForPrint = htmlResponse;
            }).fail(function () {
                lessonTimesForPrint = "Kļūda, ielādējot stundu laikus!";
            });
        }



        //Kopē skata virsraksta bloku
        //var viewTitle = $("#ViewHeader").text();
        //content = content.replace('<!--page_title-->', viewTitle);

        var pupilNameObj = $(".student-selector-option").first().find("*");
        var pupilName = pupilNameObj.each(function() {
            $(this).append(" ");
        }).text(); //Būs tukšums, ja pārsauks elementa klasi ".student-selector-option"!

        content = content.replace("<!--pupil_name-->", pupilName);


        // Aizpildīt drukas skatu ar saturu... SECĪBA SVARĪGA!
        // Izdrukā iekļaujamos rezultātus ir jāliek DIV tagā ar attiecīgo klasi!

        if (includeLessonTimes) {
            content = content.replace("<!--lessonTimes-->", lessonTimesForPrint);
        }
        content = content.replace("<!--contentBlockForPrint-->", contentBlockForPrint.html());

        content = content.replace("HiddenBeforePrintPreview", ""); //Dzēš CSS klasi, kas slēpj elementu, pirms print preview skata.


        // Lai nebūtu IE7,8,9 errors...
        content = content.replace("$(document).ready", "function disabledFunc() {return true};disabledFunc");




        printWin.document.body.innerHTML = "";
        printWin.document.write(content);
        printWin.document.close();

    }).fail(function () {
        printWin.document.write("");
        printWin.document.write("<!DOCTYPE html><html><head>");
        printWin.document.write("<title></title></head><body><div style=\"position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); margin: auto;\">Notikusi kļūda!<br/><br/>Lūdzu aizveriet šo logu un pārlādējiet iepriekšējo lapu.</div></body></html>");
        printWin.document.close();
    });
    //return false;
};



//Izkmentēts un jādzēš, nav skaidrs, kur pielieto!
//window.refreshAdboxBaners_NEW_FOR_IFRAMES = function() {
//    var allAdboxIframePlaceholders = document.getElementsByClassName('inxBX-placement');

//    if (!allAdboxIframePlaceholders.length) return;

//    for (var i = 0; i < allAdboxIframePlaceholders.length; i++) {
//        allAdboxIframePlaceholders.item(i).contentWindow.location.reload();
//    }
//}


//Izkomentēts un jādzēš, jo: Bug 319: Sentry kļūda cannot ready property 'style' of null
//window.refreshAdboxBanersWithAndroidHack = function() {
//    /// Ļauj atsvaidzināt un pārlādēt lapas Adbox bannerus, nepārladējot lapu.
//    /// Izmanto "click" notikumos vai funkcijās.
//    /// Ar pēc noklusējuma ieslēgtu atbalstu Android Eklases aplikācijai v2.4.
//    refreshAdboxBaners(true);
//}


//Izkomentēts un jādzēš, jo: Bug 319: Sentry kļūda cannot ready property 'style' of null
//window.refreshAdboxBaners = function (withBannerHackForOldAndroid) {
//    /// Ļauj atsvaidzināt un pārlādēt lapas Adbox bannerus, nepārladējot lapu.
//    /// Izmanto "click" notikumos vai funkcijās.
//    /// withBannerHackForOldAndroid nepieciešams, lai secīgi izsauktu arī changeImgToDivInBannerZones()
//    // Autors: kp 2018.g.

//    var runWithBannerHackForOldAndroid = withBannerHackForOldAndroid || false;

//    if (typeof window.inxBXconfig === "undefined") { //Ja nav atrasts propertijs no AdboxScript.cshtml
//        return;
//    }

//    var adboxPlaceholders = window.adboxPlaceholders || [];
//    var adboxPlaceholderIds = window.adboxPlaceholderIds || [];

//    if (typeof window.inxBX === "object" && window.inxBX !== null) {
//        window.inxBX.config = window.inxBXconfig.config;

//        //window.inxBX.containers ir kolekcija ar objektiem, kas atbilst lapā esošiem placeholder-iem!
//        //kw ir propertijs ar placeholdera nosaukumu.
//        if (typeof window.inxBX.containers === "object" && window.inxBX.containers !== null) {

//            var containers = Object.keys(window.inxBX.containers).map(function (e) {
//                return window.inxBX.containers[e];
//            });

//            var containerValues = Object.keys(containers).map(function (e) {
//                return containers[e];
//            });

//            //console.log(Object.values(window.inxBX.containers).length);
//            for (var i = 0; i < containerValues.length; i++) {
//                adboxPlaceholders.push((containerValues[i]).kw);
//                adboxPlaceholderIds.push("#" + (containerValues[i]).kw);
//            }
//        }


//        //Object.assign() nedrīkst izmantot, jo nesupportē Android View un IE!
//        window.inxBX.queue = window.inxBXconfig.queue;
//        window.inxBX.placement = window.inxBXconfig.placement;
//    } else {
//        window.inxBX.config = window.inxBXconfig.config;
//        window.inxBX.queue = window.inxBXconfig.queue;
//        window.inxBX.placement = window.inxBXconfig.placement;
//    }

//    var adBoxBodyElement = document.getElementById('inxBXloader');

//    if (typeof adBoxBodyElement !== "undefined" && adBoxBodyElement !== null) {
//        adBoxBodyElement.parentNode && adBoxBodyElement.parentNode.removeChild(adBoxBodyElement);
//    }

//    //lai nepiesārņotu DOM ar emiter script elementiem, iepriekš pievienotos dzēš
//    var adBoxEmitterElements = document.querySelectorAll('script[src*="emiter/bx_placement.js"]');
//    if (adBoxEmitterElements.length) {
//        for (var k = 0; k < adBoxEmitterElements.length; k++) {
//            adBoxEmitterElements[k].parentNode && adBoxEmitterElements[k].parentNode.removeChild(adBoxEmitterElements[k]);
//        }
//    }

//    //Koda bloks līdzīgs kodam, kas ir iekš AdboxSripts, taču netiek izmantots lapas ielādes statuss.
//    var bx = document.createElement('script'); bx.type = 'text/javascript'; bx.id = 'inxBXloader'; bx.async = !0;
//    bx.src = 'http' + ('https:' == document.location.protocol ? 's' : '') + '://' + inxBX.config.emiter + '/bxlib/js/loader.js?' + (new Date()).getTime();
//    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bx);

//    //Pārlādē bannerus, vadoties pēc placeholder vietām lapā.
//    for (var j = 0; j < adboxPlaceholders.length; j++) {
//       inxBX.placement({ id: adboxPlaceholders[j] });
//        //console.log(adboxPlaceholders[j]);
//    }

//   // console.log($(adboxPlaceholderIds.toString()));
//    if (typeof runWithBannerHackForOldAndroid === "boolean" && runWithBannerHackForOldAndroid) {
//        setTimeout(function() {
//            changeImgToDivInBannerZones($(adboxPlaceholderIds.toString()));
//        }, 700);
//    }
//}

//Pie iepr.!!!
//var changeImgToDivInBannerZones = function(jqueryObject, isTestPage) {
//    /// Sagatavo pareizu Adbox baneru darbību Eklases Android versijā 2.4
//    /// (jaunā logā atver nevis attēlu, bet pareizu banera linku)
//    /// Pirmais parametrs ir jQuery objekts ar baneru zonu ID-iem: $("#zone1, #zone2, etc...")
//    /// Otrais parametrs ir optional. Ja true - tad ieslēdz paziņojumus Consolē.

//    var bannerZones = jqueryObject || {};

//    var forTesting = isTestPage || false;

//    /*
//        E-klases Android mobapp 2.4 versijā ir nepilnība*, kas neļauj pareizi atvērt linku jaunā
//        logā, ja ir ielinkots attēls. Risinājums ir linkā attēlu nomainīt uz div
//        elementu ar background image. 2.5 versijā šīs nepilnības nav, jo atļauts ielādēt jebkādu URL.

//        *saistīta ar to, ka aplikācijā tika ieviesta pārbaude uz <a> target esamību/neesamību...
//    */
//    if (window.innerWidth < 768) {

//        var clientUserAgent = navigator.userAgent || navigator.vendor || window.opera;
//        var $bannerZones = bannerZones; //$("#page_mtopline, #page_mmidline, #testZone1, #testZone2");

//        // Tikai Android-iem!
//        if (/android/i.test(clientUserAgent)) {

//            if (forTesting && $bannerZones.length) {
//                console.log("");
//                console.log("*** Currently found advertisement zones: ");
//            }

//            $bannerZones.each(function(i, currentZone) {
//                if (forTesting) {
//                    console.log("    " + (i + 1) + ". " + currentZone.id);
//                    if (i === $bannerZones.length - 1) console.log("");
//                }

//                /*
//                    Dinamiski pielabo bannerus, lai Eklases app v2.4 nevērtu vaļā attēla src, bet gan a href linku.
//                    Iterē pa baneru zonām, meklē "a > img". Ja atrodas, tad nomaina img uz div.
//                */
//                var maxTime = 2000; // 2 seconds
//                var time = 0;

//                var interval = setInterval(function() {
//                        //console.log(current.id + " visible=" + $thisZone.is(':visible'));
//                        if ($(currentZone).is(':visible')) {
//                            // visible, do something

//                            if (forTesting) console.log("processing " + currentZone.id + "...");

//                            var isHackApplied = false;

//                            //Atrod visus linkotots banerus, img aizstāj ar div
//                            if (forTesting) {
//                                console.log($(currentZone));
//                                console.log($(currentZone).find("a > img"));
//                            }

//                            $(currentZone).find("a > img").each(function(n, currentBannerImage) {
//                                if (forTesting) console.log("   [url] " + $(currentBannerImage).parent().prop("href"));
//                                $(currentBannerImage).replaceWith(function(i, v) {
//                                    var style = "/*width: 100%;*/ width: " + this.width + "px; height: " + this.height + "px; box-sizing: border-box; display: block; padding: 0; margin: 0; background: url('" + this.src + "') no-repeat center center;  background-size: cover;";

//                                    return $('<div/>',
//                                        {
//                                            style: style
//                                        });
//                                });
//                                isHackApplied = true;
//                            });

//                            if (isHackApplied) {
//                                if (forTesting) console.log("   [ok] hack applied to zone " + currentZone.id);
//                            } else {
//                                if (forTesting) console.log("   [!] hack not applied to zone " + currentZone.id + ", no img found");
//                            }

//                            clearInterval(interval);
//                        } else {
//                            if (time > maxTime) {
//                                // still hidden, after 2 seconds, stop checking

//                                clearInterval(interval);
//                                return;
//                            }

//                            // not visible yet, do something
//                            time += 100;
//                        }
//                    },
//                    200);
//            });
//        }
//    }
//}


var blockHistoryState = function(url) {
    var historyUrl = url || location.href;
    if (window.history && history.pushState) {
        if (typeof history.pushState !== "undefined") {

            for (var i = 0; i < 20; i++) {
                history.pushState({}, "", historyUrl);
            }
        }
    }
};

$(document).on("focus", ".header-first-menu-item", function(){
    let $submenu = $(this).find(".header-first-submenu");
    if($submenu) $($submenu).show();
});

$(document).on("focusout", ".header-first-menu-item", function(e){
    let $submenu = $(this).find(".header-first-submenu");
    if(!this.contains(e.relatedTarget)) $($submenu).removeAttr("style");
});

window.findBootstrapEnvironment = findBootstrapEnvironment;
window.addLoadingMessageBlock = addLoadingMessageBlock;
window.initTinyChartWithParams = initTinyChartWithParams;
window.initHorizontalTinyChartWithParams = initHorizontalTinyChartWithParams;

export {
    findBootstrapEnvironment,
    setErrorMessages,
    removeErrorMessages,
    loadScriptResources,
    initTinyChartWithParams,
    initHorizontalTinyChartWithParams,
    addLoadingMessageBlock,
};