import React, { Component } from 'react'
import NormalList from '@/components/container/NormalList/NormalList.tsx'
import GitmojiConfig from '@/config/gitmoji/list'

interface ListProps {

}
let gimojiList = [
  { key: ':sparkles:', code: ':sparkles:', icon: '✨', description: '引入新功能', descriptionEn: 'Introducing new features.' }, 
  { key: ':bug:', code: ':bug:', icon: '🐛', description: '修复了Bug', descriptionEn: 'Fixing a bug.' }, 
  { key: ':lipstick:', code: ':lipstick:', icon: '💄', description: '更新UI和样式文件', descriptionEn: 'Updating the UI and style files.' }, 
  { key: ':fire:', code: ':fire:', icon: '🔥', description: '移除代码或文件', descriptionEn: 'Removing code or files.' }, 
  { key: ':children_crossing:', code: ':children_crossing:', icon: '🚸', description: '改善用户体验/可用性', descriptionEn: 'Improving user experience / usability.' },
  { key: ':pencil2:', code: ':pencil2:', icon: '✏️', description: '改正错字', descriptionEn: 'Fixing typos.' }, 
  { key: ':heavy_plus_sign:', code: ':heavy_plus_sign:', icon: '➕', description: '添加依赖', descriptionEn: 'Adding a dependency.' }, 
  { key: ':art:', code: ':art:', icon: '🎨', description: '改进代码结构/格式', descriptionEn: 'Improving structure / format of the code.' },
  { key: ':whale:', code: ':whale:', icon: '🐳', description: '关于Docker的工作', descriptionEn: 'Work about Docker.' }, 
  { key: ':zap:', code: ':zap:', icon: '⚡️', description: '提高性能', descriptionEn: 'Improving performance.' }, 
  { key: ':speech_balloon:', code: ':speech_balloon:', icon: '💬', description: '更新文字', descriptionEn: 'Updating text and literals.' }, 
  { key: ':ambulance:', code: ':ambulance:', icon: '🚑', description: '重要补丁', descriptionEn: 'Critical hotfix.' }, 
  { key: ':arrow_up:', code: ':arrow_up:', icon: '⬆️', description: '依赖升级', descriptionEn: 'Upgrading dependencies.' }, 
  { key: ':truck:', code: ':truck:', icon: '🚚', description: '移动或重命名文件', descriptionEn: 'Moving or renaming files.' }, 
  { key: ':memo:', code: ':memo:', icon: '📝', description: '写文档', descriptionEn: 'Writing docs.' }, 
  { key: ':rocket:', code: ':rocket:', icon: '🚀', description: '部署程', descriptionEn: 'Deploying stuff.' }, 
  { key: ':tada:', code: ':tada:', icon: '🎉', description: '初次提交', descriptionEn: 'Initial commit.' }, 
  { key: ':white_check_mark:', code: ':white_check_mark:', icon: '✅', description: '增加测试', descriptionEn: 'Updating tests.' }, 
  { key: ':lock:', code: ':lock:', icon: '🔑', description: '修复安全问题', descriptionEn: 'Fixing security issues.' }, 
  { key: ':apple:', code: ':apple:', icon: '🍎', description: '修复macOS上的东西', descriptionEn: 'Fixing something on macOS.' }, 
  { key: ':penguin:', code: ':penguin:', icon: '🐧', description: '修复Linux上的东西', descriptionEn: 'Fixing something on Linux.' }, 
  { key: ':checkered_flag:', code: ':checkered_flag:', icon: '🏁', description: '修复Windows上的东西', descriptionEn: 'Fixing something on Windows.' }, 
  { key: ':robot:', code: ':robot:', icon: '🤖️', description: '修复Android上的东西', descriptionEn: 'Fixing something on Android.' }, 
  { key: ':green_apple:', code: ':green_apple:', icon: '🍏', description: '修复iOS上的东西', descriptionEn: 'Fixing something on iOS.' }, 
  { key: ':bookmark:', code: ':bookmark:', icon: '🔖', description: '发布/版本标签', descriptionEn: 'Releasing / Version tags.' }, 
  { key: ':rotating_light:', code: ':rotating_light:', icon: '🚨', description: '移除linter警告', descriptionEn: 'Removing linter warnings.' }, 
  { key: ':construction:', code: ':construction:', icon: '🚧', description: '工作进行时', descriptionEn: 'Work in progress.' }, 
  { key: ':green_heart:', code: ':green_heart:', icon: '💚', description: '修复CI构建', descriptionEn: 'Fixing CI Build.' }, 
  { key: ':arrow_down:', code: ':arrow_down:', icon: '⬇️', description: '依赖降级', descriptionEn: 'Downgrading dependencies.' }, 
  { key: ':construction_worker:', code: ':construction_worker:', icon: '👷', description: '添加CI构建系统', descriptionEn: 'Adding CI build system.' }, 
  { key: ':chart_with_upwards_trend:', code: ':chart_with_upwards_trend:', icon: '📈', description: '添加分析或跟踪代码', descriptionEn: 'Adding analytics or tracking code.' }, 
  { key: ':hammer:', code: ':hammer:', icon: '🔨', description: '重构代码', descriptionEn: 'Refactoring code.' }, 
  { key: ':heavy_minus_sign:', code: ':heavy_minus_sign:', icon: '➖', description: '移除依赖', descriptionEn: 'Removing a dependency.' }, 
  { key: ':wrench:', code: ':wrench:', icon: '🔧', description: '更改配置文件', descriptionEn: 'Changing configuration files.' }, 
  { key: ':globe_with_meridians:', code: ':globe_with_meridians:', icon: '🌐', description: '国际化与本地化', descriptionEn: 'Internationalization and localization.' }, 
  { key: ':hankey:', code: ':hankey:', icon: '💩', description: '编写了需要改进的差代码', descriptionEn: 'Writing bad code that needs to be improved.' }, 
  { key: ':rewind:', code: ':rewind:', icon: '⏪', description: '恢复更改', descriptionEn: 'Reverting changes.' }, 
  { key: ':twisted_rightwards_arrows:', code: ':twisted_rightwards_arrows:', icon: '🔀', description: '合并分枝', descriptionEn: 'Merging branches.' }, 
  { key: ':package:', code: ':package:', icon: '📦', description: '更新已编译的文件或包', descriptionEn: 'Updating compiled files or packages.' }, 
  { key: ':alien:', code: ':alien:', icon: '👽', description: '由于外部API的更改而更新代码', descriptionEn: 'Updating code due to external API changes.' }, 
  { key: ':page_facing_up:', code: ':page_facing_up:', icon: '📄', description: '添加或更新许可证', descriptionEn: 'Adding or updating license.' }, 
  { key: ':boom:', code: ':boom:', icon: '💥', description: '引入突破性变化', descriptionEn: 'Introducing breaking changes.' }, 
  { key: ':bento:', code: ':bento:', icon: '🍱', description: '添加或更新资源文件', descriptionEn: 'Adding or updating assets.' }, 
  { key: ':ok_hand:', code: ':ok_hand:', icon: '👌', description: '由于代码审查而更新代码', descriptionEn: 'Updating code due to code review changes.' }, 
  { key: ':wheelchair:', code: ':wheelchair:', icon: '♿️', description: '改善易达到', descriptionEn: 'Improving accessibility.' }, 
  { key: ':bulb:', code: ':bulb:', icon: '💡', description: '记录源代码', descriptionEn: 'Documenting source code.' }, 
  { key: ':beers:', code: ':beers:', icon: '🍻', description: '醉着写代码', descriptionEn: 'Writing code drunkenly.' }, 
  { key: ':card_file_box:', code: ':card_file_box:', icon: '🗃️', description: '执行数据库相关更改', descriptionEn: 'Performing database related changes.' }, 
  { key: ':loud_sound:', code: ':loud_sound:', icon: '🔉', description: '添加日志', descriptionEn: 'Adding logs.' }, 
  { key: ':mute:', code: ':mute:', icon: '🔇', description: '移除日志', descriptionEn: 'Removing logs.' }]
class List extends Component<ListProps, {}> {
  public state = {
    externalTableData: gimojiList
  }
  public render() {
    return <NormalList config={GitmojiConfig} externalTableData={this.state.externalTableData}></NormalList>
  }
}


export default List


