var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var isWX =
    isMobile && navigator.userAgent.indexOf("MicroMessenger") > 0
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.wow();
      Init.aboutBar();
      Init.dropdown();
      Init.slick();
      Init.categoryToggle();
      Init.formValidation();
      Init.Popover();
      Init.goJD();
    },
    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },
    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },
    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 1000);
    },
    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    wow: function () {
      if ($(".wow").length) {
        var wow = new WOW({
          boxClass: "wow",
          animateClass: "animated",
          mobile: true,
          live: true,
        });
        wow.init();
      }
    },
    aboutBar: function () {
      var lang = {
        cleaning: "85%",
        build: "50%",
        repairing: "75%",
      };
      var multiply = 3;
      $.each(lang, function (language, pourcent) {
        var delay = 200;
        setTimeout(function () {
          $("#" + language + "-pourcent").html(pourcent);
        }, delay * multiply);
        multiply++;
      });
    },
    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const optionsContainer = selected.children[2];
        const optionsList = selected.querySelectorAll(
          "div.wrapper-dropdown li"
        );

        selected.addEventListener("click", () => {
          let arrow = selected.children[1];

          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.children[1];
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // update the display of the dropdown
        for (let o of optionsList) {
          o.addEventListener("click", () => {
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
          });
        }
      });

      // check if anything else ofther than the dropdown is clicked
      window.addEventListener("click", function (e) {
        if (e.target.closest(".wrapper-dropdown") === null) {
          closeAllDropdowns();
        }
      });

      // close all the dropdowns
      function closeAllDropdowns() {
        const selectedAll = document.querySelectorAll(".wrapper-dropdown");
        selectedAll.forEach((selected) => {
          const optionsContainer = selected.children[2];
          let arrow = selected.children[1];

          handleDropdown(selected, arrow, false);
        });
      }

      // open all the dropdowns
      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },
    slick: function () {
      if ($(".testimonials-slider").length) {
        $(".testimonials-slider").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !0,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
                variableWidth: false,
                centerMode: false,
              },
            },
          ],
        });
      }
      if ($(".article-slider").length) {
        $(".article-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: !0,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          dots: false,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
                variableWidth: true,
                centerMode: true,
              },
            },
          ],
        });
      }
      if ($(".contact-slider").length) {
        $(".contact-slider").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: !0,
          autoplay: true,
          dots: true  ,
          draggable: !0,
          arrows: !1,
          lazyLoad: "progressive",
          speed: 800,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1
              },
            },
            {
              breakpoint: 820,
              settings: {
                slidesToShow: 2
              },
            }
          ],
        });
      }
      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },
    categoryToggle: function () {
      if ($(".cus-support-container").length) {
        $(".myTextBox").on("click", function() {
            var textBoxValue = $(this).text().trim();
            $(".myTextBoxResult").val(textBoxValue);
        });
      }
    },
    formValidation: function () {
    },
    copy: function(txt){
      return new Promise((resolve, reject) => {
          if (navigator.clipboard) {  
              navigator.clipboard.writeText(txt).then(function() {
                  console.log('复制成功');
                  if(resolve){
                    resolve();
                  }
              }, function(err) {  
                  console.error('复制失败:', err);
                  if(reject){
                    reject(err);
                  }
              });  
          } else {  
              // 对于不支持Clipboard API的浏览器，可以使用旧方法（例如创建一个临时的textarea）  
              var textarea = document.createElement('textarea');
              textarea.value = txt;
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand('copy');
              document.body.removeChild(textarea);
              console.log('已复制到剪贴板');
              resolve();
          } 
      });
    },
    goJD: function (e){
      $(".goJD").click(function(){
        $(".copyTis").hide();
        let url = "https://npcitem.jd.hk/10110113648871.html";
        $(".jumpJd").attr("href", url);
        Init.copy($("#scroll-container").attr("data-code")).then(function(){
          $(".copyOK").show();
          setTimeout(function(){
            location.href = url;
          }, 2000);
        }).catch(function(){
          $(".copyFail").show();
        }).finally(function(){
          
        });
        return false;
      });
    },
    Popover: function(){
      $(document).ready(function(){
        $("[data-toggle='popover']").popover();
      });
    },
  };
  Init.i();
})(window, document, jQuery);
