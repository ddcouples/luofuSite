import React from 'react';
import Vector from '../tools/Vector';
import { rand } from '../tools/tools';
class MechanicsSvg extends React.Component{
 constructor(...args){
    super(...args);
    this.state={
       width:'',
       height:'',
       initialPx:20,
       initialPy:80,
       relation:40,
       k:0.02,
       decay:0.98,
       linkPath:[],
       mouse:new Vector()
    }
    this.tick=this.tick.bind(this);
    this.do=this.do.bind(this);
    this.move=this.move.bind(this);
    this.setViewBox=this.setViewBox.bind(this);
 }
 
 componentWillMount() {
    
 }
 componentDidMount() {
   var that =this;
   this.setViewBox();
   let _points = this.getInitialPoints();
   document.onmousemove=this.move;
    
    this.state.points=_points;

   window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
   // this.refs.texts.addEventListener('mouseover',function(e){
   // 		console.log(e);
   // },false)
   setTimeout(function(){
    MechanicsSvg.then= +new Date();
     that.tick()
   },2000);
 }

 tick(){
     var now = +new Date();
     var t = now - MechanicsSvg.then;
     t/=180;
     MechanicsSvg.then=now;
     this.setViewBox()
    if(window.requestAnimationFrame){
      this.state.reqAniFrameId = window.requestAnimationFrame(this.tick);
     }else{
         setTimeout(this.tick, 1000/30);
     }  
     this.do(t);
 }
 setViewBox(){
   if(!this.refs.svg){
    cancelAnimationFrame(this.state.reqAniFrameId);
   }
    var svgObj=this.refs.svg.getBoundingClientRect();
    this.state.width=svgObj.width;
    this.state.height=svgObj.height;
    this.refs.svg.setAttribute('viewBox', '-'+svgObj.width/2+' -'+svgObj.height/2+' '+svgObj.width+' '+svgObj.height)
 }
 do(t) {
    let ps=this.state.points,relation=this.state.relation,_mouse=this.state.mouse;
    ps.forEach((pa,ia) => {
       let f = new Vector();
       ps.forEach((pb,ib)=>{
         if(ia == ib) return;
         let l=Vector.fromPoints(pa.s,pb.s);
         
         var delta = l.length() - relation;
         if(delta<relation*4){
          f=f.add(l.normalize(delta * this.state.k));
         }
         
         if(Math.abs(delta)<(relation/2)&&delta<0){
         	f=f.add(l.normalize(delta * this.state.k*2));
         }
         if(Math.abs(delta)<(relation/4)&&delta<0){
         	f=f.add(l.normalize(delta * this.state.k*4));         	
         }
       })
	    let mouseL=Vector.fromPoints(pa.s,_mouse);
	    let mouseDelta = mouseL.length() -relation;
	     if(mouseDelta < relation *2&&mouseDelta>0){
	     	f=f.add(mouseL.normalize(mouseDelta * this.state.k*10));
	     }
	    if(Math.abs(mouseDelta) < (relation/2)&&mouseDelta<0){
	     	f=f.add(mouseL.normalize(mouseDelta * this.state.k*1000));
	     }   
       pa.a=f;
       pa.v=pa.v.add(pa.a.multipy(t));
       if(pa.v.length()>10){
       	pa.v=pa.v.multipy(this.state.decay);
       }
                 
       pa.s=pa.s.add(pa.v.multipy(t));
       //delen
       if(pa.s.x<-this.state.width/2||pa.s.x>this.state.width/2){
         pa.v.x=-pa.v.x;
       }
       if(pa.s.y<-this.state.height/2||pa.s.y>this.state.height/2){
         pa.v.y=-pa.v.y;
       }
       pa.tspan.setAttribute('x', pa.s.x);
       pa.tspan.setAttribute('y', pa.s.y);
    });

    var linkPath=[];
    ps.forEach(function(pa,ia){
      let sa=pa.s;
      ps.forEach(function(pb,ib){
        if(ia == ib) return;
        let sb=pb.s;
         let l=Vector.fromPoints(pa.s,pb.s);
         var delta = l.length() - relation;
         if(delta < relation *2){
         	linkPath =linkPath.concat([
	           'M',sa.x,sa.y,
	           'L',sb.x,sb.y
	        ])
         }        
        
      })
      let _mouseL=Vector.fromPoints(pa.s,_mouse);
      let _mouseDelta = _mouseL.length() -relation; 
      if(_mouseDelta < relation *2){
         	linkPath =linkPath.concat([
	           'M',sa.x,sa.y,
	           'L',_mouse.x,_mouse.y
	        ])
         }             
      })
    this.setState({
       linkPath:linkPath
    })
 }
 getRandom(min,max){
    return Math.round(Math.random()*(max-min)+min);
 }
 getInitialPoints() {
    let _texts=this.props.text.split('');
    let svgNs='http://www.w3.org/2000/svg';
    let fragments=document.createDocumentFragment();
    let points = _texts.map((v,i) => {
      //delen
       let x,y=0,color='hsl('+360 /_texts.length *(i+1)+',100%,80%)';
          x=-(_texts.length/2-i)*this.state.initialPx;
       let txt=document.createElementNS(svgNs,'tspan');
       txt.setAttribute('x',x);
       txt.setAttribute('y',y);
       txt.setAttribute('fill',color);
       txt.textContent=v;
       fragments.appendChild(txt);
       return {
          name:v,
          color:color,
          tspan:txt,
          s:new Vector(x,y),
          v:new Vector(rand(-200,200),rand(-200,200)),
          a:new Vector()
       }
    })
    this.refs.texts.appendChild(fragments);
    return points;
 }
 move(e){
  var svgObj=this.refs.svg.getBoundingClientRect();
 	this.setState({
 		mouse:new Vector(e.pageX-svgObj.left-svgObj.width/2,e.pageY-svgObj.top-svgObj.height/2)
 	})
 }

 render(){
    return (
        <svg width="100%" ref="svg"  height="100%" style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:'0'}} preserveAspectRatio="xMidYMid meet">
           <text ref="texts" fontSize={20} textAnchor="middle" dominantBaseline="middle">
           </text>
           
           <path fill="none" strokeWidth="0.5" stroke="gray" d={this.state.linkPath.join(' ')}></path>
        </svg>
    );
 }
}
MechanicsSvg.defaultProps = {
};

export default MechanicsSvg;