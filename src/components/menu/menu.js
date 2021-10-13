import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, FileAddOutlined } from "@ant-design/icons";
import { useContext } from "react/cjs/react.development";
import { LayoutContext } from "antd/lib/layout/layout";
// import { useEffect } from "react/cjs/react.development";

const { SubMenu } = Menu;

const rutas = [
	{
		id: "/",
		type: "menu",
		title: "Home",
		ruta: "/",
		icon: "home",
	},
	{
		id: "/usuario",
		type: "submenu",
		title: "Usuario",
		icon: "user",
		rutas: [
			{
				id: "/listar-usuario",
				title: "Listar Usuario",
				ruta: "/listar-usuario",
				icon: "",
			},
			{
				id: "/editar-usuario",
				title: "Editar Usuario",
				ruta: "/editar-usuario",
				active: false,
			},
			{
				id: "/segundo-nivel",
				title: "Segundo Nivel",
				ruta: "/segundo-nivel",
			},
		],
	},
	{
		id: "/prueba",
		type: "menu",
		title: "prueba",
		ruta: "/prueba",
		icon: "add",
	},
];

export const MenuComponent = () => {
	const location = useLocation();
	const { isMobil } = useContext(LayoutContext);

	const [openKeys, setOpenKeys] = useState([""]);

	useEffect(() => {
		let id = "";
		rutas.forEach((el) => {
			if (el.type === "menu") {
				if (el.ruta === location.pathname) {
					id = el.id;
				}
			} else {
				el.rutas.forEach((r) => {
					if (r.ruta === location.pathname) {
						id = el.id;
					}
				});
			}

			setOpenKeys(id);
		});
	}, [location.pathname]);

	const IconMenu = ({ value = "" }) => {
		switch (value) {
			case "home":
				return <HomeOutlined />;
			case "user":
				return <UserOutlined />;
			case "add":
				return <FileAddOutlined />;
			default:
				return <HomeOutlined />;
		}
	};

	const onOpenChange = (keys) => {
		console.log("keys", keys);
		setOpenKeys(keys[1]);
	};

	return (
		<Menu
			theme="dark"
			onOpenChange={onOpenChange}
			onClick={(e) => {
				console.log("w", e);
				if (e.keyPath.length > 1) {
					setOpenKeys(e.keyPath[1]);
				} else {
					setOpenKeys(e.keyPath[0]);
				}
			}}
			openKeys={[openKeys]}
			defaultSelectedKeys={[location.pathname]}
			mode={isMobil === true ? "vertical" : "inline"}
		>
			{rutas.map((el) => {
				if (el.type === "menu") {
					return (
						<Menu.Item key={el.id} icon={<IconMenu value={el.icon} />}>
							{el.title}
							<Link to={el.ruta} />
						</Menu.Item>
					);
				} else if (el.type === "submenu") {
					return (
						<SubMenu
							key={el.id}
							title={el.title}
							icon={<IconMenu value={el.icon} />}
						>
							{el.rutas.map(
								(r) =>
									r?.active !== false && (
										<Menu.Item key={r.id}>
											{r.title}
											<Link to={r.ruta} />
										</Menu.Item>
									)
							)}
						</SubMenu>
					);
				}

				return "";
			})}

			{/* <SubMenu
				key="/listar-post"
				icon={<SettingOutlined />}
				title="Post"
			>
				<Menu.Item key="/listar-post">
					Listar Post
					<Link to="/listar-post" />
				</Menu.Item>
			</SubMenu> */}
		</Menu>
	);
};
