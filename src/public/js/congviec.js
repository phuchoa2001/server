var bartime = document.querySelector(".Congviec-time");
var barmusic = document.querySelector(".Congviec-music");
var barsetime = document.querySelector(".Congviec-settime");
var barsetmusic = document.querySelector(".Congviec-setmusic");
var sourcemusic = document.querySelector(".sourcemusic");
var musicset = document.querySelector(".music-set");
var congviectext = document.querySelector(".Congviec-Text");
var listtable = document.querySelector(".list-table");
var Congviecadd = document.querySelector(".Congviec-add");
var array = [];
const d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();
Push.create(`Nội dung : Kích Hoạt Thành Công`, {
  body: `bạn đã kích hoạt thành công`,
  icon: "https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-alarm-clock-icon-flat-design-vector-illustration-png-image_1627999.jpg",
  timeout: 4000,
  vibrate: 200,
  onClick: function () {
    window.focus();
    this.close();
  },
});
bartime.onchange = function () {
  var value = bartime.value;
  if (value == "option") {
    barsetime.style.display = "flex";
  } else {
    barsetime.style.display = "none";
  }
};
barmusic.onchange = function () {
  console.log("hello");
  var value = barmusic.value;
  var source = "/music/" + value;
  var srcmusic = ` 
    <h1 class="badge bg-secondary">Nhạc Thử tại Đây</h1>
    <audio controls>
    <source src="${source}" type="audio/mpeg" class="sourcemusic" >
    </audio>`;
  musicset.innerHTML = srcmusic;
  barsetmusic.style.display = "block";
};
document.querySelector(".Congviec-add").onclick = function () {
  var congviecaddtext = document.querySelector(".Congviec-add").innerText;
  var settext = document.querySelector(".settext");
  obj = {
    text: settext.value,
    time: settime(),
    music: barmusic.value,
    id: generate(),
  };
  if (settext.getAttribute("etion"));
  {
    obj.id = settext.getAttribute("etion");
  }
  if (congviecaddtext == "Sữa Công Việc") {
    array.map((table, index) => {
      if (obj.id == table.id) {
        array[index] = obj;
      }
    });
    Congviecadd.innerText = "Thêm công việc";
  } else {
    var id = generate();
    obj.id = id;
    array.push(obj);
    var string = ` <textarea class="form-control Congviec-Text settext" id="exampleFormControlTextarea1" rows="3" placeholder="hãy gì nội dụng tại đây "></textarea>`;
    var texs = document.querySelector(".Congviec-Texs");
  }
  setaddtable();
  showtable();
};
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
function generate() {
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    s4() +
    "-" +
    s4() +
    s4() +
    "-" +
    s4() +
    s4() +
    "-" +
    s4() +
    s4() +
    "-" +
    s4() +
    s4() +
    "-"
  );
}
function setaddtable() {
  barsetime.style.display = "none";
  bartime.value = "selected";
  barmusic.value = "selected";
  musicset.style.display = "none";
}
function settime(string) {
  var value = bartime.value * 1;
  var time = 0;
  var sethours, setminutes, setseconds;
  if (bartime.value == "option") {
    var sethours = document.querySelector(".sethours").value;
    var setminutes = document.querySelector(".setminutes").value;
    var setseconds = document.querySelector(".setseconds").value;
    time = sethours + ":" + setminutes + ":" + setseconds;
  } else {
    if (value < 60) {
      if (minutes + value > 60) {
        sethours = hours + 1;
        setminutes = minutes + value - 60;
        setseconds = seconds;
      } else {
        sethours = hours;
        setminutes = minutes + value;
        setseconds = seconds;
      }
    } else {
      sethours = hours + 1;
      setminutes = minutes;
      setseconds = seconds;
    }
  }
  time = setthoigian(sethours, setminutes, setseconds);
  return time;
}
function showtable() {
  var tabletext = "";
  array.map((table, index) => {
    tabletext += `<tr key="${index}">
        <th scope="row">${index}</th>
        <td>${table.text}</td>
        <td>${table.time}</td>
        <td>${table.music}</td>
         <td class="row">
           <button type="button" class="btn btn-primary  btn-sm btn-50 btn-etion" id=${table.id} >Chỉnh sữa </button>
           <button type="button" class="btn btn-secondary btn-sm btn-50 btn-delete" id=${table.id}>Xóa</button>
       </td>
      </tr>`;
  });
  listtable.innerHTML = tabletext;
  var btnetion = document.querySelectorAll(".btn-etion");
  var btndetele = document.querySelectorAll(".btn-delete");
  for (i = 0; i < btnetion.length; i++) {
    btnetion[i].onclick = function () {
      let id = this.getAttribute("id");
      etion(id);
    };
  }
  for (i = 0; i < btndetele.length; i++) {
    btndetele[i].onclick = function () {
      let id = this.getAttribute("id");
      detele(id);
    };
  }
  saveData();
}
function saveData() {
  localStorage.setItem("table", JSON.stringify(array));
}
function timehours(time) {
  var hours = time.slice(0, 2) * 1;
  var minutes = time.slice(3, 5) * 1;
  var seconds = time.slice(6, 8) * 1;
  var obj = {
    hours,
    minutes,
    seconds,
  };
  return obj;
}
function etion(id) {
  array.map((item) => {
    if (item.id == id) {
      barsetime.style.display = "flex";
      var sethours = document.querySelector(".sethours");
      var setminutes = document.querySelector(".setminutes");
      var setseconds = document.querySelector(".setseconds");
      var time = timehours(item.time);
      var times = ` <div class="col">
         <input type="text" class="form-control sethours" placeholder=" Giờ" aria-label="gio" value=${time.hours} >
          </div>
          <div class="col">
         <input type="text" class="form-control setminutes" placeholder=" Phút" aria-label="phut" value=${time.minutes} >
          </div>
            <div class="col">
         <input type="text" class="form-control setseconds" placeholder=" Giây" aria-label="giay" value=${time.seconds} >
          </div>`;
      barsetime.innerHTML = times;
      bartime.value = "option";
      barmusic.value = item.music;
      var string = ` <textarea class="form-control Congviec-Text settext" id="exampleFormControlTextarea1" rows="3" placeholder="hãy gì nội dụng tại đây " etion="${item.id}" >${item.text}</textarea>`;
      var texs = document.querySelector(".Congviec-Texs");
      texs.innerHTML = string;
      Congviecadd.innerHTML = "Sữa Công Việc";
    }
  });
}
if (localStorage.getItem("table")) {
  array = JSON.parse(localStorage.getItem("table"));
  showtable();
}
function setthoigian(hours, minutes, seconds) {
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
function detele(id) {
  array.map((item, index) => {
    if (item.id == id) {
      array.splice(index, 1);
    }
  });
  showtable();
}
setInterval(() => {
  const d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var time = setthoigian(hours, minutes, seconds);
  array.map((table) => {
    if (time == table.time) {
      console.log("đã chạy vào");
      var music = ` <h1 class="badge bg-secondary">Báo Thức Đã Kích Hoạt ! ${table.text} : vào giờ ${table.time}</h1>
          <audio  id="resutlaudio" controls >
          <source src="/music/${table.music}" type="audio/mpeg">
          </audio> <button type="button" class="btn btn-danger remove-notification">Hủy bỏ thông báo</button>`;
      document.querySelector(".result").innerHTML = music;
      setTimeout(() => {
        document.getElementById("resutlaudio").play();
        var removenotification = document.querySelector(".remove-notification");
        Push.create(`Nội dung : ${table.text}`, {
          body: `Thời gian : ${table.time}`,
          icon: "https://png.pngtree.com/png-vector/20190729/ourlarge/pngtree-alarm-clock-icon-flat-design-vector-illustration-png-image_1627999.jpg",
          timeout: 10000,
          vibrate: 200,
          onClick: function () {
            window.focus();
            removenotification.click();
            this.close();
          },
        });
        removenotification.onclick = function () {
          document.querySelector(".result").innerHTML = "";
        };
      }, 1000);
    }
  });
}, 1000);
