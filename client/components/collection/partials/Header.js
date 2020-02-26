import React, {PureComponent, Fragment} from 'react'

class Header extends PureComponent{

      render(){
      	return(
          <Fragment>
			<div className="br-header">
				<div className="br-header-left">
					<div className="br-logo"><a href=""><span>Feelfunny</span></a></div>
				</div>
				<div className="br-header-right">
					<nav className="nav">
						<div className="dropdown">
							<a href="" className="nav-link pd-x-7 pos-relative" data-toggle="dropdown">
								<i className="icon ion-ios-email-outline tx-24"></i>
								<span className="square-8 bg-danger pos-absolute t-15 r-0 rounded-circle"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-header wd-300 pd-0-force">
								<div className="d-flex align-items-center justify-content-between pd-y-10 pd-x-20 bd-b bd-gray-200">
									<label className="tx-12 tx-info tx-uppercase tx-semibold tx-spacing-2 mg-b-0">Messages</label>
									<a href="" className="tx-11">+ Add New Message</a>
								</div>
								<div className="media-list">
									<a href="" className="media-list-link">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img3.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<div className="d-flex align-items-center justify-content-between mg-b-5">
													<p className="mg-b-0 tx-medium tx-gray-800 tx-14">Donna Seay</p>
													<span className="tx-11 tx-gray-500">2 minutes ago</span>
												</div>
												<p className="tx-12 mg-b-0">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring.</p>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img4.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<div className="d-flex align-items-center justify-content-between mg-b-5">
													<p className="mg-b-0 tx-medium tx-gray-800 tx-14">Samantha Francis</p>
													<span className="tx-11 tx-gray-500">3 hours ago</span>
												</div>
												<p className="tx-12 mg-b-0">My entire soul, like these sweet mornings of spring.</p>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img7.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<div className="d-flex align-items-center justify-content-between mg-b-5">
													<p className="mg-b-0 tx-medium tx-gray-800 tx-14">Robert Walker</p>
													<span className="tx-11 tx-gray-500">5 hours ago</span>
												</div>
												<p className="tx-12 mg-b-0">I should be incapable of drawing a single stroke at the present moment...</p>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img5.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<div className="d-flex align-items-center justify-content-between mg-b-5">
													<p className="mg-b-0 tx-medium tx-gray-800 tx-14">Larry Smith</p>
													<span className="tx-11 tx-gray-500">Yesterday</span>
												</div>
												<p className="tx-12 mg-b-0">When, while the lovely valley teems with vapour around me, and the meridian sun strikes...</p>
											</div>
										</div>
									</a>
									<div className="pd-y-10 tx-center bd-t">
										<a href="" className="tx-12"><i className="fa fa-angle-down mg-r-5"></i> Show All Messages</a>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown">
							<a href="" className="nav-link pd-x-7 pos-relative" data-toggle="dropdown">
								<i className="icon ion-ios-bell-outline tx-24"></i>
								<span className="square-8 bg-danger pos-absolute t-15 r-5 rounded-circle"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-header wd-300 pd-0-force">
								<div className="d-flex align-items-center justify-content-between pd-y-10 pd-x-20 bd-b bd-gray-200">
									<label className="tx-12 tx-info tx-uppercase tx-semibold tx-spacing-2 mg-b-0">Notifications</label>
									<a href="" className="tx-11">Mark All as Read</a>
								</div>

								<div className="media-list">
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img8.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<p className="tx-13 mg-b-0 tx-gray-700"><strong className="tx-medium tx-gray-800">Suzzeth Bungaos</strong> tagged you and 18 others in a post.</p>
												<span className="tx-12">October 03, 2017 8:45am</span>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img9.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<p className="tx-13 mg-b-0 tx-gray-700"><strong className="tx-medium tx-gray-800">Mellisa Brown</strong> appreciated your work <strong className="tx-medium tx-gray-800">The Social Network</strong></p>
												<span className="tx-12">October 02, 2017 12:44am</span>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img10.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<p className="tx-13 mg-b-0 tx-gray-700">20+ new items added are for sale in your <strong className="tx-medium tx-gray-800">Sale Group</strong></p>
												<span className="tx-12">October 01, 2017 10:20pm</span>
											</div>
										</div>
									</a>
									<a href="" className="media-list-link read">
										<div className="media pd-x-20 pd-y-15">
											<img src="../img/img5.jpg" className="wd-40 rounded-circle" alt="" />
											<div className="media-body">
												<p className="tx-13 mg-b-0 tx-gray-700"><strong className="tx-medium tx-gray-800">Julius Erving</strong> wants to connect with you on your conversation with <strong className="tx-medium tx-gray-800">Ronnie Mara</strong></p>
												<span className="tx-12">October 01, 2017 6:08pm</span>
											</div>
										</div>
									</a>
									<div className="pd-y-10 tx-center bd-t">
										<a href="" className="tx-12"><i className="fa fa-angle-down mg-r-5"></i> Show All Notifications</a>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown">
							<a href="" className="nav-link nav-link-profile" data-toggle="dropdown">
								<span className="logged-name hidden-md-down">Katherine</span>
								<img src="../img/img1.jpg" className="wd-32 rounded-circle" alt="" />
								<span className="square-10 bg-success"></span>
							</a>
							<div className="dropdown-menu dropdown-menu-header wd-200">
								<ul className="list-unstyled user-profile-nav">
									<li><a href=""><i className="icon ion-ios-person"></i> Edit Profile</a></li>
									<li><a href=""><i className="icon ion-ios-gear"></i> Settings</a></li>
									<li><a href=""><i className="icon ion-ios-download"></i> Downloads</a></li>
									<li><a href=""><i className="icon ion-ios-star"></i> Favorites</a></li>
									<li><a href=""><i className="icon ion-ios-folder"></i> Collections</a></li>
									<li><a href=""><i className="icon ion-power"></i> Sign Out</a></li>
								</ul>
							</div>
						</div>
					</nav>
					<div className="navicon-right">
						<a id="btnRightMenu" href="" className="pos-relative">
							<i className="icon ion-ios-chatboxes-outline"></i>
							<span className="square-8 bg-danger pos-absolute t-10 r--5 rounded-circle"></span>
						</a>
					</div>
				</div>
			</div>
          </Fragment>
        )
      }
}

export default Header;





