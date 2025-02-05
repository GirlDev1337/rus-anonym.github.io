import React from "react";

import {
    SplitCol,
    PanelHeader,
    Group,
    Cell,
    Spacing,
    useAdaptivity,
    ViewWidth,
    PanelHeaderBack,
    Separator,
} from "@vkontakte/vkui";

import {
    Icon28ArticlesOutline,
    Icon28CubeBoxOutline,
    Icon28HomeOutline,
    Icon28InfoCircleOutline,
    Icon28ServicesOutline,
    Icon28UserOutline,
} from "@vkontakte/icons";

import HeaderLeftButtons from "./HeaderLeftButtons";
import router from "../../TS/store/router";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import RusAnonymTitle from "./RusAnonymTitle";

const NavigationCell = ({
    path,
    icon,
    text,
}: {
    path: string;
    icon: React.ReactNode;
    text: string;
}): JSX.Element => {
    const activeViewStyle: React.CSSProperties = {
        backgroundColor: "var(--button_secondary_background)",
        borderRadius: 8,
    };

    return (
        <Cell
            onClick={(): void => {
                router.activeView = path;
            }}
            disabled={router.activeView === path}
            style={router.activeView === path ? activeViewStyle : {}}
            before={icon}
            after={
                router.activeView === path &&
                router.activePanel !== null && (
                    <PanelHeaderBack
                        size={24}
                        onClick={(): void => {
                            router.activePanel = null;
                        }}
                    />
                )
            }
        >
            {text}
        </Cell>
    );
};

const ObserverNavigationCell = observer(NavigationCell);

const DesktopNavPanel = (): JSX.Element => {
    const { viewWidth } = useAdaptivity();
    const isDesktop = viewWidth >= ViewWidth.TABLET;

    const { t } = useTranslation("translation", { keyPrefix: "pages" });

    return (
        <SplitCol fixed width={"20vw"} maxWidth={"20vw"}>
            <PanelHeader separator={isDesktop} before={<HeaderLeftButtons />}>
                <RusAnonymTitle />
            </PanelHeader>

            <Group>
                <ObserverNavigationCell
                    text={t("main.title")}
                    icon={<Icon28HomeOutline />}
                    path=""
                />
                <Spacing />
                <ObserverNavigationCell
                    text={t("about.title")}
                    icon={<Icon28UserOutline />}
                    path="about"
                />
                <Spacing />
                <ObserverNavigationCell
                    text={t("articles.title")}
                    icon={<Icon28ArticlesOutline />}
                    path="articles"
                />
                <Spacing />
                <ObserverNavigationCell
                    text={t("utils.title")}
                    icon={<Icon28ServicesOutline />}
                    path="utils"
                />
                <Spacing />
                <ObserverNavigationCell
                    text={t("prototypes.title")}
                    icon={<Icon28CubeBoxOutline />}
                    path="prototypes"
                />
                <Spacing />
                <Separator />
                <Spacing />
                <ObserverNavigationCell
                    text={t("aboutSite.title")}
                    icon={<Icon28InfoCircleOutline />}
                    path="about-site"
                />
            </Group>
        </SplitCol>
    );
};

export default DesktopNavPanel;
