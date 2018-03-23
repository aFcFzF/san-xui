/**
 * @file demos/xui-webuploader.js
 * @author leeight
 */

import {defineComponent} from 'san';
import {Row, WebUploader, Switch, Toast, Button, ToastLabel} from 'san-xui';

/* eslint-disable */
const template = `<template>
<xui-toastlabel>这个 demo 无法正常的工作，因为需要有一个在线的服务接收上传的请求，但是现在没有这个服务。</xui-toastlabel>

<x-row label="initialize error">
    <xui-webuploader />
</x-row>

<x-row label="[default]">
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
    />
</x-row>

<x-row label="hide & show">
    <xui-button on-click="toggleUploader">{{show ? 'Hide' : 'Show'}}</xui-button>
    <xui-webuploader
        url="/api/null/upload"
        on-accept="onAccept($event)"
        style="{{uploaderStyle}}"
    />
</x-row>

<x-row label="jpg,gif,png;auto-start=false;multiple=true;options=...">
    <xui-webuploader
        url="/api/null/upload"
        auto-start="{{false}}"
        multiple
        label="请选择图片"
        options="{{uploader.options}}"
    />
</x-row>

<x-row label="disabled">
    <xui-switch checked="{=uploader.disabled=}" />
    <xui-webuploader
        disabled="{=uploader.disabled=}"
        url="/api/null/upload"
    />
</x-row>

</template>`;
/* eslint-enable */

export default defineComponent({
    template,
    components: {
        'x-row': Row,
        'xui-button': Button,
        'xui-switch': Switch,
        'xui-toastlabel': ToastLabel,
        'xui-webuploader': WebUploader
    },
    computed: {
        uploaderStyle() {
            const show = this.data.get('show');
            const style = {
                display: show ? 'inline-block' : 'none'
            };
            return style;
        }
    },
    initData() {
        return {
            show: false,
            uploader: {
                disabled: true,
                options: {
                    accept: {
                        title: 'Files',
                        extensions: 'jpg,jpeg,gif,png',
                        mimeTypes: 'image/jpeg,image/gif,image/png'
                    }
                }
            }
        };
    },
    toggleUploader() {
        const show = this.data.get('show');
        this.data.set('show', !show);
    },
    onAccept(event) {
        const ret = event.ret;
        if (ret.success) {
            Toast.success('上传成功');
        }
    }
});
