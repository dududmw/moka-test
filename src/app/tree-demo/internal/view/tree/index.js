'use strict';
import React,{Component,PropTypes} from 'react';
import cn from 'classnames';
import s from './index.less';

import {Checkbox,Svg} from 'pc-comp';

class Line extends Component{
    render(){
        const {main,reverse,label,total,checked,onChange,onClick}=this.props;
        return (
            <div className={cn(s.item,main&&s.main)} onClick={onClick}>
                <Checkbox
                    value={checked}
                    onChange={onChange}
                />
                <span className={s.label}>{label}</span>
                <span className={s.total}>{total}</span>
                {
                    main&&<Svg.ArrowDown className={cn(s.extra,reverse&&s.reverse)}/>
                }
            </div>
        );
    }
}
class Item extends Component{
    static propTypes={
        expanded:PropTypes.bool,
    };
    static defaultProps={
        expanded:false,
    };
    constructor(props){
        super(props);
        this.state={
            expanded:props.expanded
        }
    }
    render(){
        const {data}=this.props;
        const {expanded}=this.state;
        return (
            <div>
                <Line
                    {...data}
                    main={true}
                    onClick={()=>{
                        this.setState({expanded:!this.state.expanded});
                    }}
                    reverse={expanded}
                />
                <div className={cn(s.content,expanded&&s.expanded)}>
                    {
                        data&&Array.isArray(data.children)&&data.children.map((child,i)=>{
                            return (
                                <Line
                                    key={i}
                                    {...child}
                                    main={false}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default class Tree extends Component{
    static propTypes={
        data:PropTypes.array.isRequired,
    };
    constructor(props){
        super(props);

        this.state={
            data:props.data
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.data!==this.state.data){
            this.setState({data:nextProps.data});
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.data!==this.state.data){
            return false;
        }
        return true;
    }
    render(){
        const {data}=this.state;
        return (
            <div className={s.root}>
                {
                    data.map((item,i)=>{
                        return (
                            <Item
                                key={i}
                                data={item}
                            />
                        )
                    })
                }
            </div>
        );
    }
}