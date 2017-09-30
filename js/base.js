'use strict';


window.onload=function(){

	var img_box=document.querySelector('.img-box');
	var size_select=document.querySelector('.size-select');
	var size_ul=document.querySelector('.size-select>ul');
	var more=document.querySelector('.more');
	var btn_prev=document.querySelector('.btn-prev');
	var btn_next=document.querySelector('.btn-next');
	var flag_select=true;
	size_select.onclick=function(){
		if(flag_select){
			flag_select=false;
			size_ul.style.width=66+'px';
		}else{
			flag_select=true;
			size_ul.style.width=0;
		}
	}

	img_box.onmouseleave=function(){
		size_ul.style.width=0;
	}
	more.onclick=function(){
		if(btn_prev.classList.contains('hide1')){
			btn_prev.classList.remove('hide1');
			btn_next.classList.remove('hide2');
			more.innerHTML='今日美图';
		}else{
			btn_prev.classList.add('hide1');
			btn_next.classList.add('hide2');
			more.innerHTML='以往美图';
		}
	}
// new  new  new  new  new  new  new  new  new    

	$.ajax({
    	url:"https://pu.ddzhan.com/api.php?mod=bing::get::img&n=8",
    	dataType:'json',	
    	success:function(res){
    		var up_bing=new bingImg();
    		up_bing.changeImg(res);
    		up_bing.changeDay(res);
    	}
    })
	
	function bingImg(){
		var that=this;
		var img_bing=document.querySelector('.img-bing');
		var img_url=document.querySelector('.img-box>a');
		var size_li=document.querySelectorAll('.size-select>ul>li');
		var size_li_mob=document.querySelectorAll('.size-select-mob');
		var size_now=document.querySelector('.img-type>span');
		var img_type=document.querySelector('.img-type').style.left;
		var btn_prev=document.querySelector('.btn-prev');
		var btn_next=document.querySelector('.btn-next');
		var modal=document.querySelector('.modal');
		this.size_array=['_1920x1080','_1366x768','_480x800'];
		this.day_num=0;
		this.size_num=this.size_array[0];
		this.modalText=['当前是第一张','已经是最后一张了'];

		this.modalFun=function(num){
			if(!num){
				modal.innerHTML=this.modalText[0];
				this.modalShow();
			}
			if(num==7){
				modal.innerHTML=this.modalText[1];
				this.modalShow();
			}
		}
		this.modalShow=function(){
			modal.style.top='50px';
			setTimeout(function(){
				modal.style.top='-300px';
			},1500)
		}
		this.selectImg=function(url,type){
    			return 'https://cn.bing.com'+url+type+'.jpg';
    	};
		this.changeImg=function(data){
			img_bing.src=this.selectImg(data.images[that.day_num].urlbase,that.size_num);
			for(var i=0;i<size_li.length;i++){
				size_li[i].index=i;
				size_li[i].onclick=function(){
					var size_val=this.innerHTML;
					that.size_num=that.size_array[this.index];
					var url_deal=that.selectImg(data.images[that.day_num].urlbase,that.size_num);
				
					if(this.index==2){
						img_type=25+'%';
					}else{
						img_type=50+'%';
					}
					
					size_now.innerHTML=size_val;
					img_url.href=url_deal;
					img_bing.src=url_deal;
				}
				size_li_mob[i].index=i;
				size_li_mob[i].onclick=function(){
					var size_val=this.innerHTML;
					size_now.innerHTML=size_val;
					that.size_num=that.size_array[this.index];
					var url_deal=that.selectImg(data.images[that.day_num].urlbase,that.size_num);
					img_url.href=url_deal;
					img_bing.src=url_deal;
				}
			}
		};
		this.changeDay=function(data){

			btn_prev.onclick=function(){
				that.day_num==0?0:that.day_num--;
				img_bing.src=that.selectImg(data.images[that.day_num].urlbase,that.size_num);
				that.modalFun(that.day_num);
			};
			btn_next.onclick=function(){
				that.day_num<7?that.day_num++:7;
				img_bing.src=that.selectImg(data.images[that.day_num].urlbase,that.size_num);
				that.modalFun(that.day_num);
			}
		}

	}

}