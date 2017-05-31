import React from 'react';
import Vector from '../tools/Vector';
import { rand } from '../tools/tools';
class MechanicsSvg extends React.Component{
 constructor(...args){
    super(...args);
    this.state={
       width:document.body.clientWidth,
       height:document.body.clientHeight,
       initialPx:20,
       initialPy:100,
       relation:300,
       k:0.05,
       decay:0.98,
       linkPath:[]
    }
    this.tick=this.tick.bind(this);
 }
 
 componentWillMount() {
    let _points = this.getInitialPoints();
    
    this.state.points=_points;
 }
 componentDidMount() {
   var that =this;
   window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

   setTimeout(function(){
    MechanicsSvg.then= +new Date();
     that.tick()
   },2000);
 }
 tick(){
     var now = +new Date();
     var t = now - MechanicsSvg.then;
     t/=200;
     MechanicsSvg.then=now;
    if(window.requestAnimationFrame){
       window.requestAnimationFrame(this.tick);
     }else{
         setTimeout(this.tick, 1000/30);
     }  
     this.do(t);
 }
 do(t) {
    let ps=this.state.points;
    ps.forEach((pa,ia) => {
       let f = new Vector();
       ps.forEach((pb,ib)=>{
         if(ia == ib) return;
         let l=Vector.fromPoints(pa.s,pb.s);
         var delta = l.length() - this.state.relation;
         f=f.add(l.normalize(delta * this.state.k));
       })
       //f=f.minus(pa.v*this.state.k*2);
       pa.a=f;
       pa.v=pa.v.add(pa.a.multipy(t))
                 //.multipy(this.state.decay);
       pa.s=pa.s.add(pa.v.multipy(t));
       pa.s.x=parseInt(pa.s.x);
       pa.s.y=parseInt(pa.s.y);
       if(pa.s.x<100||pa.s.x>this.state.width-100){
         pa.v.x=-pa.v.x * this.state.decay;
       }
       if(pa.s.y<200||pa.s.y>this.state.height-100){
         console.log(pa.s);
         pa.v.y=-pa.v.y * this.state.decay;
       }
    });
    var linkPath=[];
    ps.forEach(function(pa,ia){
      let sa=pa.s;
      ps.forEach(function(pb,ib){
        if(ia == ib) return;
        let sb=pb.s;
        linkPath =linkPath.concat([
           'M',sa.x,sa.y,
           'L',sb.x,sb.y
        ])
      })
    })
    this.setState({
       points:ps,
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
       let x,y=this.state.height/2,color='hsl('+360 /_texts.length *(i+1)+',100%,80%)';
          x=this.state.width/2 -(_texts.length/2-i)*this.state.initialPx;
       let circle=document.createElementNS(svgNs,'circle');
       circle.setAttribute('cx',x);
       circle.setAttribute('cy',y);

       return {
          name:v,
          color:color,
          s:new Vector(x,y),
          v:new Vector(),
          a:new Vector()
       }
    })
    return points;
 }

 render(){
    return (
        <svg width="100%" height="100%" style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:'0'}}>
           <text style={{fontSize:'100px'}} dx="20 20 20 20 20" textAnchor="middle">
             {
                this.state.points.map((v,i) => {
                    return (<text x={v.s.x} y={v.s.y} fill={v.color}
                           fontSize={30} textAnchor="middle" dominantBaseline="middle"
                           key={i}>{v.name}</text>)
                })
             }
           </text>
           <path fill="none" strokeWidth="0.3" stroke="gray" d={this.state.linkPath.join(' ')}></path>
        </svg>
    );
 }
}
MechanicsSvg.defaultProps = {
};

export default MechanicsSvg;