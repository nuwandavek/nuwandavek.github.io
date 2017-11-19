var mapPlot= function(){
    d3.json("res/india.json", function(error, us) {
        

        
        var path = d3.geoPath().projection(d3.geoMercator().scale(1100));
        var projection = d3.geoMercator().scale(1100);
        if (error) throw error;
        //console.log(us);
        var svgorig = d3.select("#map").append("svg").attr("width", 650).attr("height", 700);
        var svg = svgorig.append("g").attr("transform","translate(-1750,550)"); 
        //var svg = svgorig.append("g"); 
        
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

        .on('active',function(){
            var id = $(".graph-scroll-active").attr("id");
            //console.log(id);
            var locs =  locations[id];
            console.log(locs);
            svgorig.selectAll(".locloc").remove();
            svgorig.append("g").selectAll(".locloc").data(locs).enter().append("circle").attr("class","locloc pulse")
            .attr("transform","translate(-1750,550)")
            .attr("cx",function(d,i){
                console.log(projection([d[1],d[0]]));
                return projection([d[1],d[0]])[0];
            })
            .attr("cy",function(d,i){
                console.log(projection([d[1],d[0]]));
                return projection([d[1],d[0]])[1];
            })
            .attr("r",function(d,i){
                return 10*d[2];
            })
            .attr("fill","#e74c3c")     
        })
        
    });
    
};





$(document).ready(function(){
    $(".loading").css("display", "none");
    $("#actualbody").css("display", "inline-block");

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
            $('#'+data[i].id+'_sub').append('<div class="col-md-4 project-tile" id="'+project.id+'" data-toggle="modal" data-target="#project-descrip"></div>');
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
        //console.log(sectionObj, projectObj);
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

    $(".project-tile2").click(function(){
        var id_tile = $(this).attr('id');
        var projectObj = socs.find((document) => document.id == id_tile);
        //console.log(projectObj);
        $(".modal-title").html(projectObj.name);
        $(".project-description").html(projectObj.description);
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