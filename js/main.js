function initMap(parkingLots) {
  let taoyuan = {
    lat: 24.992901,
    lng: 121.300972
  };
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: taoyuan
  });
  let infowindow = new google.maps.InfoWindow({
    content: "",
    maxWidth: 300
  });
  for (let i = 0; i < parkingLots.length; i++) {
    let parkingLot = parkingLots[i];
    let marker = new google.maps.Marker({
      position: {
        lat: parkingLot.wgsY,
        lng: parkingLot.wgsX
      },
      title: parkingLot.parkName
    });
    marker.setMap(map);
    let contentString =
      "<h5>停車場：" +
      parkingLot.parkName +
      "</h5><h6>地址：" +
      parkingLot.address +
      "</h6><p>收費標準" +
      parkingLot.payGuide +
      "</p>";
    marker.addListener("click", function() {
      infowindow.setContent(contentString);
      infowindow.open(map, this);
    });
  }
}
$(document).ready(
  $.get(
    "https://heterosis.github.io/parking-lot-off-street-in-taoyuan/js/parking-lots-off-street-info-of-taoyuan.json",
    function(data) {
      let parkingLots = data.parkingLots;
      initMap(parkingLots);
    },
    "json"
  )
);