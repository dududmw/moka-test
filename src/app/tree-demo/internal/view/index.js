'use strict';
if(module.hot)module.hot.accept();

import React,{Component} from 'react';
import {render} from 'react-dom';
import s from './index.less';

import Tree from './tree';

class Root extends Component{
    constructor(props){
        super(props);
        this.state={
            data:this._getData([
                {label:'工程研发部门A',checked:false,expanded:false,total:40,children:[
                    {label:'Mac开发工程师',total:9,checked:false},
                    {label:'Web前端工程师',total:31,checked:false}
                ]},
                {label:'工程研发部门B',checked:false,expanded:false,total:40,children:[
                    {label:'Mac开发工程师',total:9,checked:false},
                    {label:'Web前端工程师',total:31,checked:false}
                ]}
            ])
        };
    }
    _getData(data){
        let newData=Object.assign(data);
        Array.isArray(newData)&&newData.map((item)=>{
            item.checked=false;
            item.expanded=false;
            item.onChange=(nextValue,e)=>{
                item.checked=nextValue;
                Array.isArray(item.children)&&item.children.map((child)=>{
                    child.checked=nextValue;
                });
                this.forceUpdate();
                e.stopPropagation();
            };
            Array.isArray(item.children)&&item.children.map((child)=>{
                child.checked=false;
                child.expanded=false;
                child.onChange=(nextValue,e)=>{
                    child.checked=nextValue;
                    this.forceUpdate();
                    e.stopPropagation();
                }
            })
        });
        return newData;
    }
    _clearAll(){
        this.state.data.map((item)=>{
            item.checked=false;
            Array.isArray(item.children)&&item.children.map((child)=>{
                child.checked=false;
            });
            this.forceUpdate();
        });
    }
    render(){
        const {data}=this.state;
        return (
            <div className={s.root}>
                <div className={s.title}>
                    招聘职位
                    <span className={s.btn} onClick={this._clearAll.bind(this)}>清空</span>
                </div>
                <Tree data={data}/>
            </div>
        );
    }
}
render(<Root/>,document.getElementById('app'));