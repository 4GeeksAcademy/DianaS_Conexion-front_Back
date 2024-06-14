import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/Logo2.png";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut = () => {
		actions.logOut();
		navigate('/')
	};

	return (
		<nav className="navbar navbar-light mb-5 d-flex flex-nowrap">
			<div className="container">
				<div className="d-flex gap-3">
					<Link to="/">
						<img className="logo" src={logoImageUrl} />
					</Link>
					<h2 className="navbar-text ms-2 me-5 mt-3 mb-2 display-4 text-center text-white fs-2"><strong></strong></h2>
				</div>
				{token ?
					<>
					<button
							className="d-flex me-4 navbar-toggler bg-white align-items-center rounded-pill"
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasNavbar"
							aria-controls="offcanvasNavbar"
							aria-label="Toggle navigation"
						>
							<div><span className="navbar-menu-button navbar-toggler-icon me-2"></span></div>
							<div className="user-icon-menu"><i className="fas fa-user-circle"></i></div>
						</button>
						<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
							<div className="offcanvas-header my-0">
								<h4 className="offcanvas-title" id="offcanvasNavbarLabel"><strong>Menú</strong></h4>
								<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
							</div>
							<div className="offcanvas-body">
								<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
									<li className="nav-item mb-1" data-bs-toggle="offcanvas">
										<Link to="/" className="text-decoration-none">
											<div className="fs-5 text-black text-decoration-none" onClick={handleLogOut}><i className="fas fa-sign-out-alt pt-3 pe-3"></i>Cerrar sesión</div>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</>
					: (
						<div>
							<button
								className="d-flex navbar-toggler bg-white align-items-center rounded-pill"
								type="button"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasNavbar"
								aria-controls="offcanvasNavbar"
								aria-label="Toggle navigation"
							>
								<div><span className="navbar-menu-button navbar-toggler-icon me-2"></span></div>
								<div className="user-icon-menu"><i className="fas fa-user-circle"></i></div>
							</button>
							<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
								<div className="offcanvas-header">
									<h4 className="offcanvas-title" id="offcanvasNavbarLabel"><strong>Menú</strong></h4>
									<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li className="nav-item mb-2" data-bs-toggle="offcanvas">
											<Link to="/login" className="text-decoration-none">
												<div className="text-black fs-5"><i className="fas fa-sign-in-alt pe-3" />Inicia sesión</div>
											</Link>
										</li>
										<li className="nav-item mb-3" data-bs-toggle="offcanvas">
											<Link to="/signup" className="text-decoration-none">
												<div className="text-black fs-5"><i className="fas fa-user-plus pe-3" />Regístrate</div>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</nav>
	);
};

