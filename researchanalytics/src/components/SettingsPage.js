import { Suspense } from 'react';
import React from 'react';

const DepartMentSetup = React.lazy(()=> import('../components/setupComponents/departmentCopmponent'));
const PlatformSetup = React.lazy(()=> import("../components/setupComponents/platformSetupComponent"));

export default function Settings() {
    return (
        <div>
            <div className='mt-4'>
                <Suspense fallback={ 
                    <div class="ui active dimmer">
                        <div class="ui loader"></div>
                        </div>}>
                    <DepartMentSetup />
                </Suspense>
            </div>
            <div className='mt-4'>
                <Suspense fallback={ 
                    <div class="ui active dimmer">
                        <div class="ui loader"></div>
                        </div>}>
                    <PlatformSetup />
                </Suspense>
            </div>           
        </div>
    );
}