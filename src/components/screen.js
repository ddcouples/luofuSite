
require('../scss/screen.scss');

import React from 'react';
class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    	l:5,
    	aniTimes:[],
    	transX:0,
    	transY:0,
    	rot:0
    }
    this.getRandomTime = this.getRandomTime.bind(this);
    this.screenMove=this.screenMove.bind(this);
    this.addEventAnimation=this.addEventAnimation.bind(this);
  }
  componentWillMount() {
  	this.getAniTimes();
  }
  componentDidMount() {
  	this.screenMove();
    
  }
  getRandomTime(min,max){
  	return parseInt(((max-min)*Math.random()+min)*100)/100;
  }
  addEventAnimation (){
    var that =this;
    // 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend click animationstart'.split(' ').forEach((v) => {
    //     that.refs.leftPart.addEventListener(v, function(){ //动画结束时事件 
              
    //         }, true);       
    // });
    setTimeout(function(){
      that.props.animateEnd();
    },6000);
  }
  screenMove(){
  	var _this=this;
  	setTimeout(function(){
        _this.addEventAnimation();
        _this.setState({
  		    transX:'140%',
  		    transY:'20%',
  		    rot:20
  	    })	
  	},5000)
  }

  getAniTimes(){
    let aniTimes=[];
    for(let i = 0; i < this.state.l; i++){
      aniTimes.push(this.getRandomTime(1,4));
  	}
  	this.setState({
  		aniTimes:aniTimes
  	})
  }
  render() {
  	let items = [],wid=1/this.state.l *100;
        for (var i = 0; i < this.state.l; i++) {
            items.push(
            	<div className="screen-left pulse" key={i} style={{width:wid+'%',animationDuration:this.state.aniTimes[i]+'s'}} >
            	</div>
            	);
        }
    return (
      <div className="full-screen">
         <div className="left" ref="leftPart" style={{transform:'translate(-'+this.state.transX+',-'+this.state.transY+') rotate('+this.state.rot+'deg)'}}>
          {items}
         </div>
         <div className="right" style={{transform:'translate('+this.state.transX+',-'+this.state.transY+') rotate(-'+this.state.rot+'deg)'}}>
          {items}
         </div>
      </div>
    );
  }
}
Screen.defaultProps = {
};

export default Screen;