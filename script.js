function redirectToUrl(itemName) {
    // Save itemName to localStorage
    localStorage.setItem("itemName", itemName);

    var url = "/view.html";
    window.location.href = url;
  }
  function redirectToUrl2(itemName) {
    // Save itemName to localStorage
    localStorage.setItem("itemName", itemName);

    var url = "/view2.html";
    window.location.href = url;
  }
  function redirectToUrl3(itemName) {
    // Save itemName to localStorage
    localStorage.setItem("itemName", itemName);

    var url = "/view3.html";
    window.location.href = url;
  }

  // ---------------------------------------------Preload--------------------------------------------

  // loading will end after document is loaded

  const preloader = document.querySelector("[data-preaload]");

  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });

  let navbar = document.querySelector(".header .navbar");

  document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle("active");
  };

  // --------------------------------------------------Sidebar------------------------------------------

  function openNav() {
    const sidePanel = document.getElementById("mysidepanel");
    if (sidePanel) {
      sidePanel.style.left = "0";
    } else {
      console.error("sidepanel not found");
    }
  }
  function closeNav() {
    const sidePanel = document.getElementById("mysidepanel");
    if (sidePanel) {
      sidePanel.style.left = "-320px";
    }
  }

  //----------------------------------------------- Hero section slider------------------------------
  let nextDom = document.getElementById("next");
  let prevDom = document.getElementById("prev");

  let sliderDom = document.querySelector(".slider");
  let SliderDom = sliderDom.querySelector(".slider .list");
  let thumbnailBorderDom = document.querySelector(".slider .thumbnail");
  let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
  let timeDom = document.querySelector(".slider .time");

  thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  let timeRunning = 3000;
  let timeAutoNext = 7000;

  nextDom.onclick = function () {
    showSlider("next");
  };

  prevDom.onclick = function () {
    showSlider("prev");
  };
  let runTimeOut;
  let runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
  function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll(".slider .list .item");
    let thumbnailItemsDom = document.querySelectorAll(
      ".slider .thumbnail .item"
    );

    if (type === "next") {
      SliderDom.appendChild(SliderItemsDom[0]);
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      sliderDom.classList.add("next");
    } else {
      SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
      thumbnailBorderDom.prepend(
        thumbnailItemsDom[thumbnailItemsDom.length - 1]
      );
      sliderDom.classList.add("prev");
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      sliderDom.classList.remove("next");
      sliderDom.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      next.click();
    }, timeAutoNext);
  }

  // ------------------------------------------------about us video slider-------------------------------------
  document
    .querySelectorAll(".about .video-container .controls .control-btn")
    .forEach((btn) => {
      btn.onclick = () => {
        let src = btn.getAttribute("data-src");
        document.querySelector(".about .video-container .video").src = src;
      };
    });

  // --------------- Back to Top btn -------------------------

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById("backToTop").style.display = "block";
    } else {
      document.getElementById("backToTop").style.display = "none";
    }
  }

  function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
      behavior: "smooth",
    });
  }




  // Get a reference to the database
  var database = firebase.database();

  // Fetch menu data from Firebase
  var menuRef = database.ref("domestic");
  menuRef.on("value", function (snapshot) {
    var menuData = snapshot.val();

    // Display menu data on the web page
    var menuContainer = document.getElementById("menu");
    menuContainer.innerHTML = "";

    for (var key in menuData) {
      if (menuData.hasOwnProperty(key)) {
        var menuItem = menuData[key];
        var menuItemElement = document.createElement("div");
        menuItemElement.innerHTML = `
        
        <button class="btn-package" onclick="redirectToUrl('${menuItem.name}')">
    <div class="packagesBox">
        <div class="image">
            <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-image">
        </div>
        <div class="content">
            <div class="package-details">    
                <div class="package-name">    
                    <h2 class="multiline-ellipsis-2">${menuItem.name}</h2>
                </div>
                <div class="package-price">        
                    <h4 class="multiline-ellipsis-3">Rs ${menuItem.price}</h4>
                </div>    
            </div>    
            <p class="multiline-ellipsis">${menuItem.description}</p>
        </div>    
    </div> </button>
`;

        menuContainer.appendChild(menuItemElement);
      }
    }
  });
  