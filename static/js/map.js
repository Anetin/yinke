$(function () {
    var size=$(window).width()/18;
    // console.log(size);
    $('html').css('font-size',size);
    // 百度地图API功能
    map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(116.417854,39.921988), 14);
    var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
                     [116.406605,39.921585,"地址：北京市东城区东华门大街"],
                     [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
                    ];
    var opts = {
                width : 250,     // 信息窗口宽度
                height: 80,     // 信息窗口高度
                title : "我的足迹" , // 信息窗口标题
                enableMessage:true//设置允许信息窗发送短息
               };
    for(var i=0;i<data_info.length;i++){
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
        var content = data_info[i][2];
        map.addOverlay(marker);               // 将标注添加到地图中

        addClickHandler(content,marker,i);
    }
    var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    // walking.search("天坛公园", "故宫");
    walking.search("东华门", "王府井");


    function addClickHandler(content,marker,i){
        marker.addEventListener("click",function(e){
            $("#list"+i).click();
            // console.log(i);
            // console.log($("#list"+i));
            openInfo(content,e)}
        );
    }
    function openInfo(content,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }


    var mapList=$("#mapList");
    mapList.on("click", "li",function(e){
        var likenum='';
        if($(this).children().first().hasClass('active')){
            $(this).children().first().removeClass('active');
        }else{

            // console.log($(this).parent("ul").find(".map-title"));
            $(this).parent("ul").find(".map-title").removeClass('active');
            $(this).children().first().addClass('active');
        }
        });
});