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
            $('#'+data[i].id+'_sub').append('<div class="col-md-3 project-tile" id="'+project.id+'" data-toggle="modal" data-target="#project-descrip"></div>');
            $('#'+project.id).append('<img class="img img-responsive tile" src="'+project.image+'"></img>');
            $('#'+project.id).append('<p class="tile-text">'+project.name+'</p>');
            $('#'+project.id).append('<p class="tile-text-hover">'+project.subhead+'</p>');
            $('#'+project.id).append('<div class="tile-overlay"></div>');
        }
    }

    $(".project-tile").click(function(){
        var id_tile = $(this).attr('id');
        var id_section = $(this).parent().parent().attr('id');
        var sectionObj = data.find((document) => document.id == id_section);
        var projectObj = sectionObj.entities.find((document) => document.id == id_tile);
        console.log(sectionObj, projectObj);
        $(".modal-title").html(projectObj.name);
        $(".project-img").attr("src",projectObj.image);
        $(".project-description").html(projectObj.description);
        if (projectObj.demoLink=='#'){
            $("#demo").addClass("disabled");    
        }
        else{
            $("#demo").removeClass("disabled");    
            $("#demo").attr("onclick","window.open('"+projectObj.demoLink+"');");
        }
        if (projectObj.codeLink=='#'){
            $("#code").addClass("disabled");    
        }
        else{
            $("#code").removeClass("disabled");  
            $("#code").attr("onclick","window.open('"+projectObj.codeLink+"');");
        }
        

    });
    mapPlot();
    $("#fb").click(function(){
        window.open("http://www.facebook.com/nuwandazlartx",'_blank');
    });
    $("#gh").click(function(){
        window.open("https://github.com/nuwandavek",'_blank');
    });
    $("#li").click(function(){
        window.open("https://www.linkedin.com/in/vivek-aithal-575b207b/",'_blank');
    });
});