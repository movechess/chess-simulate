import {h, VNode} from "snabbdom";
import {Me} from "../auth";
import {Ctrl} from "../ctrl";
import {MaybeVNodes} from "../interfaces";
import {href} from "../routing";
import colorpicker from "./colorpicker";
import "../../scss/_navbar.scss";

export default async function (ctrl: Ctrl, body: MaybeVNodes): Promise<VNode> {
  return h("body", [await renderNavBar(ctrl), h("div.container", body)]);
}

const renderNavBar = async (ctrl: Ctrl) =>
  h("header.navbar.navbar-expand-md.navbar-dark.bg-dark", [
    h("div.container", [
      h(
        "a.navbar-brand",
        {
          attrs: href("/"),
        },
        "Lichess API Demo"
      ),
      h(
        "button.navbar-toggler",
        {
          attrs: {
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": "#navbarSupportedContent",
            "aria-controls": "navbarSupportedContent",
            "aria-expanded": false,
            "aria-label": "Toggle navigation",
          },
        },
        h("span.navbar-toggler-icon")
      ),
      h("div#navbarSupportedContent.collapse.navbar-collapse", [
        h("ul.navbar-nav", [
          ctrl.auth.me && (await connectButton(ctrl.auth.me)),
          ctrl.auth.me ? userNav(ctrl.auth.me) : anonNav(),
        ]),
      ]),
    ]),
  ]);

const userNav = (me: Me) =>
  h("li.nav-item.dropdown", [
    h(
      "a#navbarDropdown.nav-link.dropdown-toggle",
      {
        attrs: {
          href: "#",
          role: "button",
          "data-bs-toggle": "dropdown",
          "aria-expanded": false,
        },
      },
      me.username
    ),
    h(
      "ul.dropdown-menu",
      {
        attrs: {
          "aria-labelledby": "navbarDropdown",
        },
      },
      [
        h(
          "li",
          h(
            "a.dropdown-item",
            {
              attrs: href("/logout"),
            },
            "Log out"
          )
        ),
      ]
    ),
  ]);

const anonNav = () =>
  h(
    "li.nav-item",
    h(
      "a.btn.btn-primary.text-nowrap",
      {
        attrs: href("/login"),
      },
      "Login with Lichess"
    )
  );

const connectButton = async (me: Me | undefined) => {
  const SubWalletExtension = (window as any).injectedWeb3["subwallet-js"];

  let content = "Connect Wallet";

  const onConnect = async () => {
    await SubWalletExtension.enable();

    await onLog();
  };

  async function onLog() {
    const ext = await SubWalletExtension.enable();
    const a = await ext.accounts.get();

    if (me?.username && ext.signer) {
      await fetch("http://localhost:3333/v1", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: me!.username,
          address: (Object.values(a)[0] as any).address,
        }),
      });
      content = "Disconnect";
    }
    return h(
      "li.nav-item",
      h("a.btn.btn-primary.text-nowrap", {on: {click: onConnect}}, `${content}`)
    );
  }

  await onLog();

  return h(
    "li.nav-item",
    h("a.btn.btn-primary.text-nowrap", {on: {click: onConnect}}, `${content}`)
  );
};
