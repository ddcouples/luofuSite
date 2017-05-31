import React from 'react';
import { rand,rndDecimals } from '../tools/tools';
class Nightsky extends React.Component{
 constructor(...args){
    super(...args);
    this.state={
    	startCount:500
    }
    this.renderStar=this.renderStar.bind(this);
 }
 
 componentWillMount() {
    
 }
 componentDidMount() {
   this.renderStar();
 }
 use(origin){
   let SVG_NS='http://www.w3.org/2000/svg';
   let XLINK_NS='http://www.w3.org/1999/xlink'; 
   let _use=document.createElementNS(SVG_NS,'use');
   _use.setAttributeNS(XLINK_NS,'xlink:href','#'+origin.id);
   return _use;
 }
 animateTransform(){
   let SVG_NS='http://www.w3.org/2000/svg';
   let _animateTransform=document.createElementNS(SVG_NS,'animateTransform');
   _animateTransform.setAttribute('attributeName','transform');
   _animateTransform.setAttribute('attributeType','XML');
   _animateTransform.setAttribute('additive','sum');
   return _animateTransform; 	
 }
 renderStar(){
 	let fragment=document.createDocumentFragment();
 	while(this.state.startCount--){
 		let star=this.use(this.refs.star);
 		let scale=rndDecimals(.1,.6);
 		star.setAttribute('opacity',rndDecimals(0.1,0.4));
 		star.setAttribute('transform','translate('+rand(-400,400)+','+rand(-300,50)+')'+'scale('+scale+')');
 		if(this.state.startCount%3==0){
 			let animate=this.animateTransform();		
            animate.setAttribute('type','rotate');
            animate.setAttribute('repeatCount','indefinite');
 			animate.setAttribute('dur', rand(5,9));
 			animate.setAttribute('from','0');
            animate.setAttribute('to','360');
 			star.appendChild(animate);
 		}
 		if(this.state.startCount%2==0){
            let animateBig=this.animateTransform();	
            let dur=rand(1,3);	
            animateBig.setAttribute('type','scale');
 			animateBig.setAttribute('dur', dur);
 			animateBig.setAttribute('from',scale);
            animateBig.setAttribute('to',scale*3);
            animateBig.setAttribute('id','big'+this.state.startCount);
            animateBig.setAttribute('begin','0;small'+this.state.startCount+'.end');
 			star.appendChild(animateBig);
            let animateSmall=this.animateTransform();		
            animateSmall.setAttribute('type','scale');
 			animateSmall.setAttribute('dur', dur);
 			animateSmall.setAttribute('from',scale*3);
            animateSmall.setAttribute('to',scale);
            animateSmall.setAttribute('id','small'+this.state.startCount);
            animateSmall.setAttribute('begin','big'+this.state.startCount+'.end');
 			star.appendChild(animateSmall);		  			 			
 		}
 		if(this.state.startCount%50==0&&scale<.5){
 			let aniStar=this.animateTransform();
 			 let dur=rand(3,6);
            aniStar.setAttribute('type','translate');
 			aniStar.setAttribute('dur', dur);
 			aniStar.setAttribute('from',rand(400,800)+' '+rand(-500,-300));
            aniStar.setAttribute('to',rand(-800,-600)+' '+rand(100,0));
            aniStar.setAttribute('repeatCount','indefinite');
            star.appendChild(aniStar);	
 		}
 		fragment.appendChild(star);
 	}
 	this.refs.stars.appendChild(fragment);
 }
 render(){
    return (
        <svg width="100%" onMouseMove={this.move} height="100%" viewBox="-400 -300 800 600" preserveAspectRatio="xMidYMid slice"
             style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:'0'}}>
          <defs>
             <polygon id="star" ref="star" x="100" y="100" points="0 -10 2 -2 10 0 2 2 0 10 -2 2 -10 0 -2 -2" fill="white"></polygon>
          </defs>
          <g id="real">
             <g ref="stars">
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#star" opacity="1">
                  <animateTransform attributeName="transform" attributeType="XML"
                    type="translate" from="800 -300" to="-800 100" dur="5s" repeatCount="indefinite"
                    additive="sum"  />
                  <animateTransform attributeName="transform" attributeType="XML"
                    type="scale" from="0" to=".5" dur="5s"  repeatCount="indefinite"
                    additive="sum"  />                    
                </use>
	          </g>
	          <g>
	             <mask id="moonMask">
	                <circle cx="-250" cy="-80" r="50" fill="white"></circle>
	                <circle cx="-150" cy="-100" r="50" fill="black">
	                   <animate attributeName="cx" id="eatMoonX"
	                             begin="10s" 
	                            from="-150"
	                            to="-250"
	                            dur="10s"
	                            fill="freeze"
	                            attributeType="XML">
	                   </animate>
                       <animate attributeName="cy" 
                                  begin="10s"
	                            from="-180"
	                            to="-80"
	                            dur="10s"
	                            fill="freeze"
	                            attributeType="XML">
	                   </animate>
                       <animate attributeName="cx" 
                                begin="eatMoonX.end+10s"
	                            from="-250"
	                            to="-150"
	                            dur="10s"
	                            fill="freeze"
	                            attributeType="XML">
	                   </animate>
                       <animate attributeName="cy"
                                begin="eatMoonX.end+10s" 
	                            from="-80"
	                            to="-180"
	                            dur="10s"
	                            fill="freeze"
	                            attributeType="XML">
	                   </animate>	                   	                   
	                </circle>               
	             </mask>
	             <circle cx="-250" cy="-80" r="50" fill="white" mask="url(#moonMask)"></circle>
	          </g>
	          <g transform="translate(255,0)">
	             <defs>
	                <linearGradient id="tower" x1="0" y1="0" x2="1" y2="0">
	                     <stop  offset="0" stopColor="#ddd"></stop>
	                     <stop  offset="1" stopColor="#333"></stop>
	                </linearGradient>
	               <radialGradient id="light" cx="0.5" cy="0.5" r="0.5">
	                     <stop  offset="0" stopColor="rgba(255,255,255,.9)"></stop>
	                     <stop  offset="1" stopColor="rgba(255,255,255,0.1)"></stop>
	                </radialGradient>                
	                <clipPath id="lightMask">
	                   <polygon points="0 0 -400 -18 -400 18" fill="#f00">
	                     <animateTransform attributeName="transform" 
	                                       type="rotate"
	                                       from="0"
	                                       to="360"
	                                       dur="10"
	                                       repeatCount="indefinite"
	                                       attributeType="XML"></animateTransform>
	                   </polygon>
	                   <circle cx="0" cy="0" r="2" fill="#fff"></circle>
	                </clipPath>
	             </defs>
	             <polygon points="0 0 5 50 -5 50" fill="url(#tower)"></polygon>
	             <ellipse cx="0" cy="0" rx="300" ry="100" fill="url(#light)" clipPath="url(#lightMask)"></ellipse>
	             
	          </g>              
          </g>
          <g transform="translate(0 50)" mask="url(#fading)">
            <defs>
               <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,.4)"></stop>
                  <stop offset=".6" stopColor="rgba(255,255,255,0)"></stop>
               </linearGradient>
               <mask id="fading">
                 <rect x="-400" y="0" width="800" height="300" fill="url(#fade)"></rect>
               </mask>
            </defs>
            <use xlinkHref="#real" transform="scale(1,-1) translate(0 -50)" ></use>
          </g>
          <line x1="-400" y1="50" x2="400" y2="50" stroke="gray"></line>
          
        </svg>
    );
 }
}
Nightsky.defaultProps = {
};

export default Nightsky;