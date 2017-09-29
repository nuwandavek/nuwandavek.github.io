var mapPlot= function(){
    d3.json("res/india.json", function(error, us) {
        

        
        var path = d3.geoPath().projection(d3.geoMercator().scale(1100));
        if (error) throw error;
        //console.log(us);
        var svgorig = d3.select("#map").append("svg").attr("width", 650).attr("height", 700);
        var svg = svgorig.append("g").attr("transform","translate(-1750,550)"); 
        
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.india).features)
            .enter().append("path").attr("class","states-fill")
            .attr("id",function(d,i){
                //console.log(d.properties);
                return d.properties.ST_NM;
            })
            .attr("d", path);


        
        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.india, function(a, b) { return a !== b; })));
        

        
        d3.graphScroll()
        .graph(d3.select('#map'))
        .container(d3.select('#container3'))
        .sections(d3.selectAll('#overlay3 > div'))

        /*.on('active',function(){
            var id = $(".graph-scroll-active").attr("id");
            d3.selectAll(".states-fill").transition().ease(d3.easeCubic).duration(1000).attr("fill",function(d,i){
                //console.log(constituencies[d.properties.PC_NAME],i);
                try{
                    return colourful(d.properties.PC_NAME, id);
                }catch(e){
                    console.log("disputed land");
                    return "#bdc3c7";
                }
            }).attr("opacity",0.75)


            var legend_map = []
            Object.keys(colors[id]).forEach(function(key) {
                return legend_map.push([key, colors[id][key]]);
            });
            console.log(legend_map);
            d3.select(".legend").remove();
            
            var newsvg = svgorig.append("g").attr("class","legend");
            newsvg.selectAll(".legs").data(legend_map).enter()
            .append("circle").attr("class","legs").attr("cx",420).attr("cy",function(d,i){
                console.log(d);
                return 150+(i*20);
            }).attr("stroke","#333333").attr("stroke-width",0.5).attr("r",5).attr("fill",function(d,i){
                if ((id == "tr-parties") || (id == "tr-gender")) {
                    return d[1];
                }else if(id=="tr-crimes"){
                    return d3.interpolateOrRd(d[1]);
                }else if(id=="tr-money"){
                    return d3.interpolateBuGn(d[1]);
                }else if(id=="tr-education"){
                    return accent(d[1]);
                }else if(id=="tr-reservation"){
                    return accent(d[1]);
                }else if(id=="tr-intro"){
                    return "#c0392b";
                }
            });

            newsvg.selectAll(".legs-text").data(legend_map).enter()
            .append("text").attr("class","legs-text bodies2").attr("x",435).attr("y",function(d,i){
                console.log(d);
                return 155+(i*20);
            }).text(function(d,i){
                return d[0];
            })  
        })
        */
    });
    
};





$(document).ready(function(){
    var scroll_start = 0;
    var startchange = $('.jumbo');
    var offset = startchange.offset();
    if (startchange.length){
        $(document).scroll(function() {
            scroll_start = $(this).scrollTop();
                if(scroll_start > offset.top) {
        		    $("#menu").addClass("menu-dark");
        		} else {
            		$('#menu').removeClass("menu-dark");
        		}
        });
    }

    for(var i = 0; i<data.length; i++){
        var newdiv = $('#tiles-main').append('<div id='+data[i].id+'></div>');
        $('#'+data[i].id).addClass('col-md-12').addClass('new-section');
        $('#'+data[i].id).append('<p class="section-head"> / '+data[i].section_name+'</p>');
        $('#'+data[i].id).append('<div class="col-md-12" id="'+data[i].id+'_sub"></div>');
        
        for(var j=0; j<data[i].entities.length;j++){
            var project = data[i].entities[j]
            $('#'+data[i].id+'_sub').append('<div class="col-md-3 project-tile" id="'+project.id+'"></div>');
            $('#'+project.id).append('<img class="img img-responsive tile" src="'+project.image+'"></img>');
            $('#'+project.id).append('<p class="tile-text">'+project.name+'</p>');
            $('#'+project.id).append('<div class="tile-overlay"></div>');    
        }
    }

    $(".project-tile").click(function(){
        $("#mega-container").addClass("hidden");
        $("#hidden-cont").append("<div class='col-md-offset-2 col-md-8' id='project-descrip'> </div>");
        var id_tile = $(this).attr('id');
        var id_section = $(this).parent().parent().attr('id');
        var sectionObj = data.find((document) => document.id == id_section);
        var projectObj = sectionObj.entities.find((document) => document.id == id_tile);
        console.log(sectionObj, projectObj);
        $("#project-descrip").append('<div id="cont" class="col-md-12"></div>');
        $("#cont").append('<p class="project-title col-md-12"><i class="fa fa-long-arrow-left buttx" aria-hidden="true"></i> '+projectObj.name+'</p>');
        $("#cont").append('<img class="img img-responsive pull-left project-img col-md-5" src='+projectObj.image+'>');
        $("#cont").append('<p class="project-description" col-md-7>'+projectObj.description+'</p>');
        $("#cont").append('<a class="btn btn-standard col-md-3 col-md-offset-3 butto" href="'+projectObj.demoLink+'">View Demo</a>');
        $("#cont").append('<a class="btn btn-standard col-md-3 butto" href="'+projectObj.codeLink+'">View Code</a>');

        $(".buttx").click(function(){
            $("#project-descrip").remove();
            $("#mega-container").removeClass("hidden");
            $('html, body').animate({
                scrollTop: $("#"+id_tile).offset().top - 100
            }, 700);
        });
    });
    mapPlot();
});