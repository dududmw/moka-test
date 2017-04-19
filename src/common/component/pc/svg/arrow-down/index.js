/**
 * Created by yaoyi on 17/4/19.
 */
import React,{Component,PropTypes} from 'react';
import cn from 'classnames';
import Basic from '../basic';
import {antiAssign} from 'util';
export default class ArrowDown extends Component{
    render(){
        return (
            <Basic
                {...antiAssign(this.props,'children')}
            >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </Basic>
        );
    }
}