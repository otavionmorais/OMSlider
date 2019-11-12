class OM_Slide {
	
	constructor(width, height){
		
		if(width<document.documentElement.clientWidth-20)
			this.width=width;
		else
			this.width=document.documentElement.clientWidth-20;
		
		this.height=height;
		this.imgs=[];
		this.currentPos=0;
		this.salt=parseInt(Math.random()*10000);
		this.name_motherContainer='mother_container'+this.salt;
		this.name_slide='slide'+this.salt;
		this.name_imgsContainer='imgs_container'+this.salt;
		this.name_classImgs='imgs_slide'+this.salt;
		this.name_botaoAnterior='botao_anterior'+this.salt;
		this.name_botaoProximo='botao_proximo'+this.salt;
		
	}
	
	setWidth(valor){
		this.width=valor;
	}
	
	setHeight(valor){
		this.height=valor;
	}
	
	addImg(img){
		this.imgs.push(img);
	}
	
	removeImg(pos){
		this.imgs.splice(pos);
	}
	
	setImgs(imgs){
		this.imgs=imgs;
	}
	
	getSize(){
		return this.imgs.length;
	}
	
	update(){
		
		$('#'+this.name_motherContainer).css('display','flex');
		
		$('#'+this.name_slide).css('display','flex');
		$('#'+this.name_slide).css('width',''+this.width);
		$('#'+this.name_slide).css('height',''+this.height);
		$('#'+this.name_slide).css('align-items','center');
		$('#'+this.name_slide).css('overflow','hidden');
		
		$('#'+this.name_botaoAnterior).css('z-index','999');
		$('#'+this.name_botaoAnterior).css('position','absolute');
		$('#'+this.name_botaoAnterior).css('font-size','40pt');
		$('#'+this.name_botaoAnterior).css('margin-left','10px');
		$('#'+this.name_botaoAnterior).css('padding','10px');
		$('#'+this.name_botaoAnterior).css('text-decoration','none');
		$('#'+this.name_botaoAnterior).css('background-color','white');
		$('#'+this.name_botaoAnterior).css('color','black');
		$('#'+this.name_botaoAnterior).css({'border-radius':'50px'});
		
		$('#'+this.name_botaoProximo).css('z-index','999');
		$('#'+this.name_botaoProximo).css('position','absolute');
		$('#'+this.name_botaoProximo).css('font-size','40pt');
		$('#'+this.name_botaoProximo).css('margin-left',''+(this.width-60)+'px');
		$('#'+this.name_botaoProximo).css('padding','10px');
		$('#'+this.name_botaoProximo).css('text-decoration','none');
		$('#'+this.name_botaoProximo).css('background-color','white');
		$('#'+this.name_botaoProximo).css('color','black');
		$('#'+this.name_botaoProximo).css({'border-radius':'50px'});
		
		$('#'+this.name_imgsContainer).css('display','flex');
		$('#'+this.name_imgsContainer).css('flex-shrink','0');
		$('#'+this.name_imgsContainer).css('height','100%');
		$('#'+this.name_imgsContainer).css({'transition':'all 1s'});
		
		$('#'+this.name_imgsContainer).css({'transform':'translateX(0)'});
		this.currentPos=0;
		
		$('.'+this.name_classImgs).css('width',''+this.width);
		$('.'+this.name_classImgs).css('height',''+this.height);
		$('.'+this.name_classImgs).css('border-radius','30px');
		
	}
	
	createSlide(itemId){
		
		$(itemId).append("<div id='"+ this.name_motherContainer +"'></div>");
			$('#'+this.name_motherContainer).append("<div id='"+ this.name_slide + "'>" +
				"<a href='#' id='"+this.name_botaoAnterior+"'><</a>"+
				"<a href='#' id='"+this.name_botaoProximo+"'>></a></div>");
		$('#'+this.name_slide).append("<div id='"+ this.name_imgsContainer+"'></div>");
		var i=0;
		for(i=0; i<this.getSize(); i++){
			$('#'+this.name_imgsContainer).append(
			"<img src='"+this.imgs[i]+"' class='"+ this.name_classImgs +"'>");
		}
		
		this.update();
		var obj=this;
		$('#'+this.name_botaoAnterior).click(function(){
			if(obj.currentPos>0){
				$('#'+obj.name_imgsContainer).css({'transform':'translateX(-'+((obj.currentPos-1)*obj.width)+'px)'});
				obj.currentPos--;
				
			} else {
				$('#'+obj.name_imgsContainer).css({'transform':'translateX(-'+((obj.getSize()-1)*obj.width)+'px)'});
				obj.currentPos=obj.getSize()-1;
			}
		});
		
		$('#'+this.name_botaoProximo).click(function(){
		
			if(obj.currentPos<obj.getSize()-1){
				$('#'+obj.name_imgsContainer).css({'transform':'translateX(-'+((obj.currentPos+1)*obj.width)+'px)'});
				obj.currentPos++;
			} else {
				$('#'+obj.name_imgsContainer).css({'transform':'translateX(0)'});
				obj.currentPos=0;
			}
		});
		
		$( window ).resize(function() {
			obj.width=document.documentElement.clientWidth-20;
			obj.update();
		});
		
	}
	
}

$(function(){

	function test(/**/){
		var args=arguments;
		for(var i=0; i<args.length; i++){
			console.log(args[i]);
		}
	}
	
	var omslide = new OM_Slide(5000, 500);
	omslide.addImg('https://om.blog.br/imgs/6.jpg');
	omslide.addImg('https://om.blog.br/imgs/5.jpg');
	omslide.createSlide('body');
	
	var omslide2 = new OM_Slide(500, 200);
	omslide2.addImg('https://om.blog.br/imgs/3.jpg');
	omslide2.addImg('https://om.blog.br/imgs/2.jpg');
	omslide2.createSlide('body');
	

});