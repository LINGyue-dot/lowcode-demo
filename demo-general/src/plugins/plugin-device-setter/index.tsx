import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const DeviceSetterPlugin = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { project, config } = ctx;
      
      // 设置默认设备类型为手机
      const setDeviceToPhone = () => {
        // 方法1: 通过 config 设置
        config.set('device', 'phone');
        console.log('DeviceSetterPlugin: 通过 config 设置设备类型为手机');
        
        // 方法2: 通过 simulatorHost 设置
        if (project.simulatorHost) {
          project.simulatorHost.set('device', 'phone');
          console.log('DeviceSetterPlugin: 通过 simulatorHost 设置设备类型为手机');
        }
      };

      // 立即尝试设置
      setDeviceToPhone();

      // 延迟设置，确保模拟器完全初始化
      setTimeout(setDeviceToPhone, 1000);
      setTimeout(setDeviceToPhone, 3000);

      // 监听模拟器准备事件（如果存在）
      if (typeof project.onSimulatorRendererReady === 'function') {
        project.onSimulatorRendererReady(() => {
          console.log('DeviceSetterPlugin: 模拟器渲染器准备就绪');
          setDeviceToPhone();
        });
      }

      // 监听模拟器变化事件
      if (project.simulatorHost) {
        project.simulatorHost.on('devicechange', () => {
          console.log('DeviceSetterPlugin: 检测到设备变化，重新设置为手机');
          setDeviceToPhone();
        });
      }
    },
  };
};

DeviceSetterPlugin.pluginName = 'DeviceSetterPlugin';
export default DeviceSetterPlugin; 