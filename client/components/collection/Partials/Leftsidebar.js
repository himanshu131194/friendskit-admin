import React , {Component, Fragment} from 'react';

class Leftsidebar extends Component{
    render(){
        return(
               <Fragment>
                    <div className="br-sideleft overflow-y-auto ps ps--theme_default ps--active-y" data-ps-id="d9e6d6e4-a07c-d13b-0851-8f86fec2b4bd">
                        <label className="sidebar-label pd-x-15 mg-t-20">Navigation</label>
                        <div className="br-sideleft-menu">
                            <a href="/" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-home-outline tx-22"></i>
                                    <span className="menu-item-label">Add Sections</span>
                                </div>
                            </a>
                            <a href="/uploader" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-email-outline tx-24"></i>
                                    <span className="menu-item-label">Universal Uploader</span>
                                </div>
                            </a>
                            <a href="/tags" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-photos-outline tx-20"></i>
                                    <span className="menu-item-label">Add Tags</span>
                                </div>
                            </a>
                            <a href="/upload-live" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon ion-ios-pie-outline tx-20"></i>
                                    <span className="menu-item-label">List Uploaded</span>
                                </div>
                            </a>
                            <a href="/latest-cursor" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon ion-ios-pie-outline tx-20"></i>
                                    <span className="menu-item-label">Latest Cursor</span>
                                </div>
                            </a>
                            <a href="/9gag-crawler" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon ion-ios-pie-outline tx-20"></i>
                                    <span className="menu-item-label">9GAG Crawler</span>
                                </div>
                            </a>

                            <a href="/insta-crawler" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-filing-outline tx-24"></i>
                                    <span className="menu-item-label">INSTA CRAWLER</span>
                                </div>
                            </a>

                            <a href="/article" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-filing-outline tx-24"></i>
                                    <span className="menu-item-label">INSTA CRAWLER</span>
                                </div>
                            </a>

                            {/* <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="accordion.html" className="nav-link">Accordion</a></li>
                                <li className="nav-item"><a href="alerts.html" className="nav-link">Alerts</a></li>
                                <li className="nav-item"><a href="buttons.html" className="nav-link">Buttons</a></li>
                                <li className="nav-item"><a href="cards.html" className="nav-link">Cards</a></li>
                                <li className="nav-item"><a href="icons.html" className="nav-link">Icons</a></li>
                                <li className="nav-item"><a href="modal.html" className="nav-link">Modal</a></li>
                                <li className="nav-item"><a href="pagination.html" className="nav-link">Pagination</a></li>
                                <li className="nav-item"><a href="popups.html" className="nav-link">Tooltip &amp; Popover</a></li>
                                <li className="nav-item"><a href="progress.html" className="nav-link">Progress</a></li>
                                <li className="nav-item"><a href="spinners.html" className="nav-link">Spinners</a></li>
                                <li className="nav-item"><a href="typography.html" className="nav-link">Typography</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon ion-ios-redo-outline tx-24"></i>
                                    <span className="menu-item-label">Navigation</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="navigation.html" className="nav-link">Basic Nav</a></li>
                                <li className="nav-item"><a href="navigation-layouts.html" className="nav-link">Nav Layouts</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon ion-ios-pie-outline tx-20"></i>
                                    <span className="menu-item-label">Charts</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="chart-morris.html" className="nav-link">Morris Charts</a></li>
                                <li className="nav-item"><a href="chart-flot.html" className="nav-link">Flot Charts</a></li>
                                <li className="nav-item"><a href="chart-chartjs.html" className="nav-link">Chart JS</a></li>
                                <li className="nav-item"><a href="chart-rickshaw.html" className="nav-link">Rickshaw</a></li>
                                <li className="nav-item"><a href="chart-chartist.html" className="nav-link">Chartist</a></li>
                                <li className="nav-item"><a href="chart-sparkline.html" className="nav-link">Sparkline</a></li>
                                <li className="nav-item"><a href="chart-peity.html" className="nav-link">Peity</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-gear-outline tx-24"></i>
                                    <span className="menu-item-label">Forms</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="form-elements.html" className="nav-link">Form Elements</a></li>
                                <li className="nav-item"><a href="form-layouts.html" className="nav-link">Form Layouts</a></li>
                                <li className="nav-item"><a href="form-validation.html" className="nav-link">Form Validation</a></li>
                                <li className="nav-item"><a href="form-wizards.html" className="nav-link">Form Wizards</a></li>
                                <li className="nav-item"><a href="form-editor-code.html" className="nav-link">Code Editor</a></li>
                                <li className="nav-item"><a href="form-editor-text.html" className="nav-link">Text Editor</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-bookmarks-outline tx-20"></i>
                                    <span className="menu-item-label">Tables</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="table-basic.html" className="nav-link">Basic Table</a></li>
                                <li className="nav-item"><a href="table-datatable.html" className="nav-link">Data Table</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-navigate-outline tx-24"></i>
                                    <span className="menu-item-label">Maps</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="map-google.html" className="nav-link">Google Maps</a></li>
                                <li className="nav-item"><a href="map-leaflet.html" className="nav-link">Leaflet Maps</a></li>
                                <li className="nav-item"><a href="map-vector.html" className="nav-link">Vector Maps</a></li>
                            </ul>
                            <a href="#" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-briefcase-outline tx-22"></i>
                                    <span className="menu-item-label">Utilities</span>
                                    <i className="menu-item-arrow fa fa-angle-down"></i>
                                </div>
                            </a>
                            <ul className="br-menu-sub nav flex-column">
                                <li className="nav-item"><a href="background.html" className="nav-link">Background</a></li>
                                <li className="nav-item"><a href="border.html" className="nav-link">Border</a></li>
                                <li className="nav-item"><a href="height.html" className="nav-link">Height</a></li>
                                <li className="nav-item"><a href="margin.html" className="nav-link">Margin</a></li>
                                <li className="nav-item"><a href="padding.html" className="nav-link">Padding</a></li>
                                <li className="nav-item"><a href="position.html" className="nav-link">Position</a></li>
                                <li className="nav-item"><a href="typography-util.html" className="nav-link">Typography</a></li>
                                <li className="nav-item"><a href="width.html" className="nav-link">Width</a></li>
                            </ul>
                            <a href="pages.html" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-paper-outline tx-22"></i>
                                    <span className="menu-item-label">Apps &amp; Pages</span>
                                </div>
                            </a>
                            <a href="layouts.html" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-book-outline tx-22"></i>
                                    <span className="menu-item-label">Layouts</span>
                                </div>
                            </a>
                            <a href="sitemap.html" className="br-menu-link">
                                <div className="br-menu-item">
                                    <i className="menu-item-icon icon ion-ios-list-outline tx-22"></i>
                                    <span className="menu-item-label">Sitemap</span>
                                </div>
                            </a>
                        </div>

                        <label className="sidebar-label pd-x-15 mg-t-25 mg-b-20 tx-info op-9">Information Summary</label>

                        <div className="info-list">
                            <div className="d-flex align-items-center justify-content-between pd-x-15">
                                <div>
                                    <p className="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Memory Usage</p>
                                    <h5 className="tx-lato tx-white tx-normal mg-b-0">32.3%</h5>
                                </div>
                                <span className="peity-bar d-none" data-peity="{ &quot;fill&quot;: [&quot;#336490&quot;], &quot;height&quot;: 35, &quot;width&quot;: 60 }" >8,6,5,9,8,4,9,3,5,9</span>
                                <svg className="peity" height="35" width="60">
                                    <rect fill="#336490" x="0.6" y="3.8888888888888893" width="4.800000000000001" height="31.11111111111111"></rect>
                                    <rect fill="#336490" x="6.6" y="11.666666666666668" width="4.800000000000001" height="23.333333333333332"></rect>
                                    <rect fill="#336490" x="12.6" y="15.555555555555554" width="4.799999999999999" height="19.444444444444446"></rect>
                                    <rect fill="#336490" x="18.6" y="0" width="4.799999999999997" height="35"></rect>
                                    <rect fill="#336490" x="24.599999999999998" y="3.8888888888888893" width="4.800000000000001" height="31.11111111111111"></rect>
                                    <rect fill="#336490" x="30.6" y="19.444444444444443" width="4.799999999999997" height="15.555555555555557"></rect>
                                    <rect fill="#336490" x="36.6" y="0" width="4.799999999999997" height="35"></rect>
                                    <rect fill="#336490" x="42.6" y="23.333333333333336" width="4.799999999999997" height="11.666666666666664"></rect>
                                    <rect fill="#336490" x="48.6" y="15.555555555555554" width="4.799999999999997" height="19.444444444444446"></rect>
                                    <rect fill="#336490" x="54.6" y="0" width="4.799999999999997" height="35"></rect>
                                </svg>
                            </div> */}

                            <div className="d-flex align-items-center justify-content-between pd-x-15 mg-t-20">
                                <div>
                                    <p className="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">CPU Usage</p>
                                    <h5 className="tx-lato tx-white tx-normal mg-b-0">140.05</h5>
                                </div>
                                <span className="peity-bar d-none" data-peity="{ &quot;fill&quot;: [&quot;#1C7973&quot;], &quot;height&quot;: 35, &quot;width&quot;: 60 }" >4,3,5,7,12,10,4,5,11,7</span>
                                <svg className="peity" height="35" width="60">
                                    <rect fill="#1C7973" x="0.6" y="23.333333333333336" width="4.800000000000001" height="11.666666666666664"></rect>
                                    <rect fill="#1C7973" x="6.6" y="26.25" width="4.800000000000001" height="8.75"></rect>
                                    <rect fill="#1C7973" x="12.6" y="20.416666666666664" width="4.799999999999999" height="14.583333333333336"></rect>
                                    <rect fill="#1C7973" x="18.6" y="14.583333333333332" width="4.799999999999997" height="20.416666666666668"></rect>
                                    <rect fill="#1C7973" x="24.599999999999998" y="0" width="4.800000000000001" height="35"></rect>
                                    <rect fill="#1C7973" x="30.6" y="5.833333333333332" width="4.799999999999997" height="29.166666666666668"></rect>
                                    <rect fill="#1C7973" x="36.6" y="23.333333333333336" width="4.799999999999997" height="11.666666666666664"></rect>
                                    <rect fill="#1C7973" x="42.6" y="20.416666666666664" width="4.799999999999997" height="14.583333333333336"></rect>
                                    <rect fill="#1C7973" x="48.6" y="2.9166666666666714" width="4.799999999999997" height="32.08333333333333"></rect>
                                    <rect fill="#1C7973" x="54.6" y="14.583333333333332" width="4.799999999999997" height="20.416666666666668"></rect>
                                </svg>
                            </div>

                            <div className="d-flex align-items-center justify-content-between pd-x-15 mg-t-20">
                                <div>
                                    <p className="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Disk Usage</p>
                                    <h5 className="tx-lato tx-white tx-normal mg-b-0">82.02%</h5>
                                </div>
                                <span className="peity-bar d-none" data-peity="{ &quot;fill&quot;: [&quot;#8E4246&quot;], &quot;height&quot;: 35, &quot;width&quot;: 60 }" >1,2,1,3,2,10,4,12,7</span>
                                <svg className="peity" height="35" width="60">
                                    <rect fill="#8E4246" x="0.6666666666666666" y="32.083333333333336" width="5.333333333333333" height="2.9166666666666643"></rect>
                                    <rect fill="#8E4246" x="7.333333333333333" y="29.166666666666668" width="5.333333333333333" height="5.833333333333332"></rect>
                                    <rect fill="#8E4246" x="14" y="32.083333333333336" width="5.333333333333332" height="2.9166666666666643"></rect>
                                    <rect fill="#8E4246" x="20.666666666666668" y="26.25" width="5.333333333333332" height="8.75"></rect>
                                    <rect fill="#8E4246" x="27.33333333333333" y="29.166666666666668" width="5.333333333333336" height="5.833333333333332"></rect>
                                    <rect fill="#8E4246" x="34" y="5.833333333333332" width="5.333333333333336" height="29.166666666666668"></rect>
                                    <rect fill="#8E4246" x="40.666666666666664" y="23.333333333333336" width="5.333333333333336" height="11.666666666666664"></rect>
                                    <rect fill="#8E4246" x="47.333333333333336" y="0" width="5.333333333333329" height="35"></rect>
                                    <rect fill="#8E4246" x="54" y="14.583333333333332" width="5.333333333333336" height="20.416666666666668"></rect>
                                </svg>
                            </div>
                            <div className="d-flex align-items-center justify-content-between pd-x-15 mg-t-20">
                                <div>
                                    <p className="tx-10 tx-roboto tx-uppercase tx-spacing-1 tx-white op-3 mg-b-2 space-nowrap">Daily Traffic</p>
                                    <h5 className="tx-lato tx-white tx-normal mg-b-0">62,201</h5>
                                </div>
                                <span className="peity-bar d-none" data-peity="{ &quot;fill&quot;: [&quot;#9C7846&quot;], &quot;height&quot;: 35, &quot;width&quot;: 60 }" >3,12,7,9,2,3,4,5,2</span>
                                <svg className="peity" height="35" width="60">
                                    <rect fill="#9C7846" x="0.6666666666666666" y="26.25" width="5.333333333333333" height="8.75"></rect>
                                    <rect fill="#9C7846" x="7.333333333333333" y="0" width="5.333333333333333" height="35"></rect>
                                    <rect fill="#9C7846" x="14" y="14.583333333333332" width="5.333333333333332" height="20.416666666666668"></rect>
                                    <rect fill="#9C7846" x="20.666666666666668" y="8.75" width="5.333333333333332" height="26.25"></rect>
                                    <rect fill="#9C7846" x="27.33333333333333" y="29.166666666666668" width="5.333333333333336" height="5.833333333333332"></rect>
                                    <rect fill="#9C7846" x="34" y="26.25" width="5.333333333333336" height="8.75"></rect>
                                    <rect fill="#9C7846" x="40.666666666666664" y="23.333333333333336" width="5.333333333333336" height="11.666666666666664"></rect>
                                    <rect fill="#9C7846" x="47.333333333333336" y="20.416666666666664" width="5.333333333333329" height="14.583333333333336"></rect>
                                    <rect fill="#9C7846" x="54" y="29.166666666666668" width="5.333333333333336" height="5.833333333333332"></rect>
                                </svg>
                            </div>
                        </div>
                        <br/>
                     
                    </div>
                </Fragment>
        )
    }
}

export default Leftsidebar;