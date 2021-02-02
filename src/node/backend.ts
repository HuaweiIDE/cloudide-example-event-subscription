/********************************************************************************
 * Copyright (C) 2020 yewei All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as cloudide from '@cloudide/plugin';
import { exposable, expose } from '@cloudide/messaging';
import { LogLevel } from '@cloudide/core/lib/common/plugin-common';
import { AbstractBackend } from '@cloudide/core/lib/node/plugin-api';

/**
 * Add your backend api in this class
 * Using '@expose' to expose your function to frontend
 */
@exposable
export class Backend extends AbstractBackend {

    /**
     * function call to the backend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function you can call function exposed by frontend 
     */
    public async run(): Promise<void> {
        let registeredEvent = cloudide.workspace.onDidDeleteFiles((event) => {
            cloudide.window.showInformationMessage(`${event.files.join(',')} deleted.`);
        });
        this.plugin.container.context.subscriptions.push(registeredEvent);
    }

    public stop(): void {

    }

}
