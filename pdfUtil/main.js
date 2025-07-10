import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet.create();

setModuleImports('js', {
    getInfos: () => {
        const nav = window.navigator;
        return [
            `appCodeName: ${nav.appCodeName}`,
            `appName: ${nav.appName}`,
            `appVersion: ${nav.appVersion}`,
            `platform: ${nav.platform}`,
            `userAgent: ${nav.userAgent}`,
            `language: ${nav.language}`,
            `languages: ${nav.languages ? nav.languages.join(', ') : ''}`,
            `onLine: ${nav.onLine}`,
            `cookieEnabled: ${nav.cookieEnabled}`,
            `hardwareConcurrency: ${nav.hardwareConcurrency}`,
            `maxTouchPoints: ${nav.maxTouchPoints}`,
            `vendor: ${nav.vendor}`,
            `product: ${nav.product}`,
            `productSub: ${nav.productSub}`,
            `vendorSub: ${nav.vendorSub}`,
            `deviceMemory: ${nav.deviceMemory ?? ''}`,
            `webdriver: ${nav.webdriver ?? false}`,
            `geolocation: ${typeof nav.geolocation !== 'undefined'}`,
            `mediaDevices: ${typeof nav.mediaDevices !== 'undefined'}`,
            `permissions: ${typeof nav.permissions !== 'undefined'}`,
            `serviceWorker: ${typeof nav.serviceWorker !== 'undefined'}`,
            `storage: ${typeof nav.storage !== 'undefined'}`,
            `bluetooth: ${typeof nav.bluetooth !== 'undefined'}`,
            `clipboard: ${typeof nav.clipboard !== 'undefined'}`,
            `connection: ${typeof nav.connection !== 'undefined'}`,
            `credentials: ${typeof nav.credentials !== 'undefined'}`,
            `doNotTrack: ${nav.doNotTrack}`,
            `presentation: ${typeof nav.presentation !== 'undefined'}`,
            `usb: ${typeof nav.usb !== 'undefined'}`,
            `xr: ${typeof nav.xr !== 'undefined'}`
        ];
    }
});

const config = getConfig();
getAssemblyExports(config.mainAssemblyName).then(exports => {
    window.aesHelper = exports.ITF.Frontend.Wasm.AesHelper;
    console.log('Assembly exports loaded successfully');
});