/*
 * This file is part of thumbor-toy project.
 *
 * (c) Raphaël Benitte <thumbor-toy@rbenitte.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React                   from 'react';
import Reflux                  from 'reflux';
import PanelsActions           from './../actions/PanelsActions';
import PanelTypes              from './../stores/PanelTypes';
import PanelsStore             from './../stores/PanelsStore';
import ToggleSetting           from './filters/settings/ToggleSetting.jsx';
import ChoiceSetting           from './filters/settings/ChoiceSetting.jsx';
import UserPreferencesStore    from './../stores/UserPreferencesStore';
import UserPreferencesActions  from './../actions/UserPreferencesActions';
import UserPreferencesTypes    from './../stores/UserPreferencesTypes';


var Modal = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            opened: PanelsStore.get(PanelTypes.SETTINGS)
        };
    },

    componentWillMount() {
        this.listenTo(PanelsStore, () => {
            this.setState({
                opened: PanelsStore.get(PanelTypes.SETTINGS)
            });
        });
    },

    onCloseClick() {
        PanelsActions.close(PanelTypes.SETTINGS);
    },

    onSettingChange(settingKey, settingValue) {
        if (settingKey === 'theme') {
            UserPreferencesActions.set(UserPreferencesTypes.THEME, settingValue);
        } else if (settingKey === 'showFiltersDescription') {
            UserPreferencesActions.set(UserPreferencesTypes.SHOW_FILTERS_DESCRIPTION, settingValue);
        }
    },

    render() {
        var classes = 'modal';
        if (this.state.opened === true) {
            classes += ' _is-opened';
        }

        var showFiltersDescriptionSetting = {
            key:   'showFiltersDescription',
            label: 'show filters description'
        };

        var themeSetting = {
            key:     'theme',
            label:   'theme',
            choices: [
                { value: 'dark',  label: 'Dark theme' },
                { value: 'light', label: 'Light theme' }
            ]
        };

        return (
            <div className={classes}>
                <div className="modal__overlay" onClick={this.onCloseClick}/>
                <div className="modal__container">
                    <div className="panel panel--img-src">
                        <h3 className="panel__title">
                            <i className="fa fa-cog"/>
                            Settings
                        </h3>
                        <div className="panel__content">
                            <ToggleSetting
                                setting={showFiltersDescriptionSetting}
                                onChange={this.onSettingChange}
                                defaultValue={UserPreferencesStore.get(UserPreferencesTypes.SHOW_FILTERS_DESCRIPTION)}
                            />
                            <ChoiceSetting
                                setting={themeSetting}
                                onChange={this.onSettingChange}
                                defaultValue={UserPreferencesStore.get(UserPreferencesTypes.THEME)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Modal;