import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { injectAssets } from '@alilc/lowcode-plugin-inject';
import assets from '../../services/assets.json';
import { getProjectSchema } from '../../services/mockService';
import AbsoluteDesignerPlugin from '../../drag';

const EditorInitPlugin = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      const { material, project, config, skeleton } = ctx;
      const scenarioName = options['scenarioName'];
      const scenarioDisplayName = options['displayName'] || scenarioName;
      const scenarioInfo = options['info'] || {};
      // 保存在 config 中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName);
      config.set('scenarioDisplayName', scenarioDisplayName);
      config.set('scenarioInfo', scenarioInfo);

      // 设置物料描述
      await material.setAssets(await injectAssets(assets));

      const schema = await getProjectSchema(scenarioName);
      // 加载 schema
      project.importSchema(schema as any);

      // 基本设备设置（详细设置由 DeviceSetterPlugin 处理）
      config.set('device', 'phone');
      console.log('EditorInitPlugin: 设置默认设备类型为手机');

      // 注册为

      // console.log('register plugin in lowcode portal');
      // skeleton.remove({
      //   area: 'mainArea',
      //   name: 'designer',
      //   type: 'Widget',
      // });

      // skeleton.add({
      //   area: 'mainArea',
      //   name: 'absolute-designer',
      //   type: 'Widget',
      //   content: AbsoluteDesignerPlugin,
      // });
    },
  };
};
EditorInitPlugin.pluginName = 'EditorInitPlugin';
EditorInitPlugin.meta = {
  preferenceDeclaration: {
    title: '保存插件配置',
    properties: [
      {
        key: 'scenarioName',
        type: 'string',
        description: '用于localstorage存储key',
      },
      {
        key: 'displayName',
        type: 'string',
        description: '用于显示的场景名',
      },
      {
        key: 'info',
        type: 'object',
        description: '用于扩展信息',
      },
    ],
  },
};
export default EditorInitPlugin;
