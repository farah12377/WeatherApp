var search=document.querySelector("#search");
var findbtn=document.querySelector("#find");
var navbtn=document.querySelector(".navbar-toggler");
function requestapi(lat,lon){
      var request= new XMLHttpRequest();
    request.open("GET",`http://api.weatherapi.com/v1/forecast.json?key=9b061128b74447cab41172344252402&q=${lat},${lon}&days=7`);
    request.send();
    request.addEventListener("load",function(){
    let current=JSON.parse(request.response);
    let forecastarray=current.forecast.forecastday;
    let date1 = new Date(forecastarray[0].date);
    let options1 = { month: 'long' };
    let num1={ day: 'numeric'}
    let month1= date1.toLocaleString('en-US', options1);
    let day1=date1.toLocaleString('en-US', num1);
    let weekday1 = date1.toLocaleDateString("en-US", { weekday: 'long' });
    let weekday2=new Date(forecastarray[1].date).toLocaleDateString("en-US", { weekday: 'long' });
    let weekday3=new Date(forecastarray[2].date).toLocaleDateString("en-US", { weekday: 'long' });
    display(current,month1,day1,forecastarray,weekday1,weekday2,weekday3);
})
  
}
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    requestapi(lat,lon);

  });


search.addEventListener("input",function(){
  var request1= new XMLHttpRequest();
    request1.open("GET",`https://api.weatherapi.com/v1/search.json?key=9b061128b74447cab41172344252402&q=${search.value}`);
    request1.send();
    request1.addEventListener("load",function(){
      let coor=JSON.parse(request1.response);
      console.log(coor);
      lon=coor[0].lon;
      lat=coor[0].lat;
      requestapi(lat,lon);
      console.log("object");
          
    })
  
})

function display(current,month1,day1,arr,weekday1,weekday2,weekday3){
  var cartoona='';
  cartoona= ` <div class="row" >
        <div class="col-lg-4 today p-0">
          <div class="days d-flex justify-content-between pt-2 ">
            <p>${weekday1}</p>
            <p>${day1}${month1}</p>
          </div>
          <div class="mt-4  forecast">
            <h5 class="mb-2">${current.location.region}</h5>
            <div class="num text-white fw-bold">${current.current.temp_c}<sup>o</sup>C</div>
            <img src="https:${current.current.condition.icon}">
            <p>${current.current.condition.text}</p>
            <div class="d-flex icons gap-4">
              <div class="d-flex gap-1">
                <img src="assets/icon-umberella.png">
                <p>20%</p>
              </div>
              <div class="d-flex gap-1">
                <img src="assets/icon-wind.png">
                <p>18km/h</p>
              </div>
              <div class="d-flex gap-1">
                <img src="assets/icon-compass.png">
                <p>East</p>
              </div>

            </div>
          </div>

        </div>
        <div class="col-lg-4 tomm  p-0">
          <div class="days d-flex justify-content-center pt-2 ">
            <p>${weekday2}</p>
          </div>
          <div class="mt-5  forecast d-flex flex-column justify-content-center align-items-center">
            <img src="https:${arr[1].day.condition.icon}" class="mb-3">
            <div class="num text-white fw-bold">${arr[1].day.maxtemp_c}<sup>o</sup>C</div>
             <div class="num1 fw-bold">${arr[1].day.mintemp_c}<sup>o</sup></div>
            <span class="mt-3">${arr[1].day.condition.text}</span>
          </div>

        </div>
        <div class="col-lg-4 tomm  p-0" id="atomm">
          <div class="days d-flex justify-content-center pt-2 ">
            <p>${weekday3}</p>
          </div>
          <div class="mt-5  forecast d-flex flex-column justify-content-center align-items-center">
            <img src="https:${arr[2].day.condition.icon}" class="mb-3">
            <div class="num text-white fw-bold">${arr[2].day.maxtemp_c}<sup>o</sup>C</div>
             <div class="num1 fw-bold">${arr[2].day.mintemp_c}<sup>o</sup></div>
            <span class="mt-3">${arr[2].day.condition.text}</span>
          </div>
        </div>
      </div>`
    document.querySelector("#myRow").innerHTML=cartoona;

}
// navbtn.addEventListener("click",function(){
//   navbtn.classList.add("border-0")
// })