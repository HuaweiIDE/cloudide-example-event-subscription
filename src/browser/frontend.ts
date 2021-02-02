/********************************************************************************
 * Copyright (C) 2020 yewei All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { LogLevel, EventType } from '@cloudide/core/lib/common/plugin-common';
import { PluginPage, AbstractFrontend } from '@cloudide/core/lib/browser/plugin-api';
import { exposable, expose } from '@cloudide/messaging';

/**
 * Adding your fronted api in this class
 * Using '@expose' to expose your function to backend
 */
@exposable
class Frontend extends AbstractFrontend {

    /**
     * function call to the frontend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin frontend
     * In this function your can call function exposed by backend
     */
    run(): void {
        const receivedEventsDom = document.getElementById('received-event');
        let eventHandler = (eventType: any, evt: any) => {
            const receivedEvent = document.createElement('pre');
            receivedEvent.append(document.createTextNode(`${JSON.stringify(evt)}`));
            receivedEventsDom?.appendChild(receivedEvent);
        };
        this.plugin.subscribeEvent(EventType.CLOUDIDE_WORKSPACE_ONDIDCREATEFILES, eventHandler);
    }

    stop(): void {

    }

    /**
     * this function can be called from plugin backend as below:
     * @example
     * ```
     * plugin.call('myplugin.page.myApi', 'this is a function call from backend').then(ret => {
     *     console.log(ret);
     * });
     * 
     * ```
     */
    @expose('myplugin.page.myApi')
    public myApi(message: string): string {
        console.log(message);
        return 'this is a return value from frontend function';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    PluginPage.create([Frontend]);
});
