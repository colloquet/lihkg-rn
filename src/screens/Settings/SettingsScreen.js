import React from 'react'
import {
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  SectionList,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ListItem from '../../components/ListItem'
import ListSeparator from '../../components/ListSeparator'
import ListSectionHeader from '../../components/ListSectionHeader'

const mapState = state => ({
  settings: state.settings,
})

const mapDispatch = dispatch => ({
  toggleSettings: dispatch.settings.toggleSettings,
  clearHistory: dispatch.app.clearHistory,
})

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '設定',
  }

  static propTypes = {
    settings: PropTypes.object.isRequired,
    clearHistory: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
  }

  clearHistory = async () => {
    this.setState({ isLoading: true })
    await this.props.clearHistory()
    this.setState({ isLoading: false })
    Alert.alert('成功清除記錄')
  }

  renderSettingsItem = ({ item, index }) => (
    <ListItem key={index} style={styles.listItem}>
      <Text style={styles.settingName}>{item.name}</Text>
      <Switch
        // tintColor="#42b983"
        onTintColor="#42b983"
        value={this.props.settings[item.key]}
        onValueChange={() => this.props.toggleSettings(item.key)}
        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
      />
    </ListItem>
  )

  renderSectionHeader = ({ section: { name } }) => name && <ListSectionHeader name={name} />

  renderSeparator = () => <ListSeparator />

  render() {
    const { isLoading } = this.state

    return (
      <SectionList
        style={{ flex: 1 }}
        renderItem={this.renderSettingsItem}
        renderSectionHeader={this.renderSectionHeader}
        sections={[
          // {
          //   name: '外觀',
          //   data: [
          //     { name: '夜間模式', key: 'darkMode' },
          //   ],
          // },
          {
            name: '內文',
            data: [
              { name: '自動載入圖片', key: 'autoLoadImage' },
              // { name: 'Youtube 預覽', key: 'ytPreview' },
              { name: '靜態表情', key: 'staticIcons' },
            ],
          },
        ]}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={() => (
          <TouchableHighlight
            style={styles.button}
            onPress={this.clearHistory}
            underlayColor="#339669"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>清除記錄</Text>
            )}
          </TouchableHighlight>
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingName: {
    fontSize: 16,
    color: '#fffc',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    margin: 8,
    backgroundColor: '#42b983',
    borderRadius: 8,
    height: 32,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
})

export default connect(mapState, mapDispatch)(SettingsScreen)
