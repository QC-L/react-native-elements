import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../avatar/Avatar';
import Badge from '../badge/badge';
import CheckBox from '../checkbox/CheckBox';
import Icon from '../icons/Icon';
import Text from '../text/Text';
import ButtonGroup from '../buttons/ButtonGroup';
import Input from '../input/Input';
import Divider from '../divider/Divider';
import ViewPropTypes from '../config/ViewPropTypes';

console.disableYellowBox = true;

const IOS_BLUE = '#007AFF';
const ANDROID_SECONDARY = 'rgba(0, 0, 0, 0.54)';

const ListItem = props => {
  const {
    title,
    titleProps,
    subtitle,
    subtitleProps,
    containerStyle,
    component,
    leftIcon,
    leftAvatar,
    leftElement,
    rightElement,
    rightTitle,
    rightTitleProps,
    inputProps,
    buttonGroupProps,
    switchProps,
    checkBoxProps,
    badgeProps,
    disclosure,
    disclosureColor,
    contentContainerStyle,
    checkmark,
    checkmarkColor,
    disabled,
    disabledStyle,
    topDivider,
    bottomDivider,
    onPress,
    onLongPress,
    ...attributes,
  } = props;

  let Component =
    component || (onPress || onLongPress ? TouchableOpacity : View);

  return (
    <Component {...attributes} onPress={onPress} disabled={disabled}>
      {topDivider && <Divider />}
      <PadView
        style={[
          styles.container,
          (buttonGroupProps || switchProps) && { paddingVertical: 8 },
          containerStyle,
          disabled && disabledStyle,
        ]}
      >
        {renderNode(leftElement)}
        {renderIcon(leftIcon)}
        {renderAvatar(leftAvatar)}
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {renderNode(title, titleProps, styles.title)}
          {renderNode(subtitle, subtitleProps, styles.subtitle)}
        </View>
        {renderNode(rightTitle, rightTitleProps, styles.rightTitle)}
        {inputProps && (
          <Input
            {...inputProps}
            inputStyle={[styles.input, inputProps && inputProps.inputStyle]}
            inputContainerStyle={[
              styles.inputContentContainer,
              inputProps && inputProps.inputContainerStyle,
            ]}
            containerStyle={[
              styles.inputContainer,
              inputProps && inputProps.containerStyle,
            ]}
          />
        )}
        {switchProps && <Switch {...switchProps} />}
        {checkBoxProps && (
          <CheckBox
            {...checkBoxProps}
            containerStyle={[
              styles.checkboxContainer,
              checkBoxProps && checkBoxProps.containerStyle,
            ]}
          />
        )}
        {badgeProps && <Badge {...badgeProps} />}
        {buttonGroupProps && (
          <ButtonGroup
            {...buttonGroupProps}
            containerStyle={[
              styles.buttonGroupContainer,
              buttonGroupProps && buttonGroupProps.containerStyle,
            ]}
          />
        )}
        {renderNode(rightElement)}
        {checkmark && <Checkmark color={checkmarkColor} />}
        {disclosure && <Disclosure color={disclosureColor} />}
      </PadView>
      {bottomDivider && <Divider />}
    </Component>
  );
};

const Disclosure = ({ color }) => (
  <Icon
    type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
    name={Platform.OS === 'ios' ? 'ios-arrow-forward' : 'keyboard-arrow-right'}
    size={16}
    color={color}
  />
);

const Checkmark = ({ color }) => (
  <Icon
    type={Platform.OS === 'ios' ? 'ionicon' : 'material'}
    name={Platform.OS === 'ios' ? 'ios-checkmark' : 'check'}
    size={Platform.OS === 'ios' ? 34 : 20}
    color={color}
    containerStyle={styles.checkmark}
  />
);

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        padding: 14,
      },
      android: {
        padding: 16,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  leftIontainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      android: {
        color: ANDROID_SECONDARY,
        fontSize: 14,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  inputContentContainer: {
    flex: 1,
    borderBottomWidth: 0,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    width: null,
    height: null,
    marginLeft: 0,
  },
  buttonGroupContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  checkboxContainer: {
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    padding: 0,
  },
  rightTitle: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 16,
      },
    }),
    color: ANDROID_SECONDARY,
  },
  checkmark: {
    height: 15,
  },
});

ListItem.propTypes = {
  containerStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  component: PropTypes.element,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  title: PropTypes.node,
  titleProps: PropTypes.object,
  subtitle: PropTypes.node,
  subtitleProps: PropTypes.object,
  leftIcon: PropTypes.node,
  leftAvatar: PropTypes.node,
  leftElement: PropTypes.element,
  rightElement: PropTypes.element,
  rightTitle: PropTypes.node,
  rightTitleProps: PropTypes.object,
  inputProps: PropTypes.object,
  buttonGroupProps: PropTypes.object,
  switchProps: PropTypes.object,
  checkBoxProps: PropTypes.object,
  badgeProps: PropTypes.object,
  disclosure: PropTypes.bool,
  disclosureColor: PropTypes.string,
  checkmark: PropTypes.bool,
  checkmarkColor: PropTypes.string,
  disabled: PropTypes.bool,
  disabledStyle: ViewPropTypes.style,
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

ListItem.defaultProps = {
  disclosureColor: '#D1D1D6',
  checkmarkColor: Platform.OS === 'ios' ? IOS_BLUE : ANDROID_SECONDARY,
};

const PadView = ({ children, pad = 16, ...props }) => {
  const childrens = React.Children.toArray(children);
  const length = childrens.length;
  return (
    <View {...props}>
      {React.Children.map(
        childrens,
        (child, index) =>
          child && [child, index !== length - 1 && <View width={pad} />]
      )}
    </View>
  );
};

const renderAvatar = content =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Avatar width={40} height={40} rounded {...content} />
  );

const renderIcon = content =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Icon
      color={Platform.OS === 'ios' ? null : ANDROID_SECONDARY}
      size={24}
      {...content}
      containerStyle={[styles.iconContainer, content && content.containerStyle]}
    />
  );

const renderNode = (content, props, style) =>
  content == null ? null : React.isValidElement(content) ? (
    content
  ) : (
    <Text {...props} style={[style, props && props.style]}>
      {content}
    </Text>
  );

export default ListItem;
