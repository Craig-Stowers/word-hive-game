import HomeScreen from "../components/screens/Home";
import Game from "../components/screens/game/Game";
import Info from "../components/screens/Info";
import Stats from "../components/screens/Stats";
import Feedback from "../components/screens/Feedback";
//wrappers
import BestFit from "../components/BestFit";
import WithHeader from "../components/layouts/WithHeader";
import OverlayButtons from "../components/layouts/OverlayButtons";
import FullWidthHeight from "../components/layouts/FullWidthHeight";

//passed to ScreenMangager to manage screen switching, screen wrappers
//useful to manage navigation on projects that don't have traditional routing (i.e games).
//useful because any wrapper event will have access to current screen/history.

export const screenMaps = {
   home: {
      component: HomeScreen,
      default: true,
      actions: {
         test: (value) => console.log("test", value),
      },
   },
   info: {
      component: Info,
      actions: {
         close: (screen) => screen.back(),
      },
      wrappers: [
         { component: FullWidthHeight },

         // { component: BestFit, props: { width: 900, height: 600, maxScale: 1.5 } },
         // { component: OverlayButtons, props: { variation: "cross&next" } },
      ],
   },

   game: {
      component: Game,
      default: false,
      actions: {
         close: (screen) => screen.change("home"),
      },
      wrappers: [
         // {
         //    component: BestFit,
         //    props: {
         //       ratioBreakPoints: {
         //          1: {
         //             width: 900,
         //             height: 600,
         //          },
         //       },
         //       width: 600,
         //       height: 900,
         //       maxScale: 1.5,
         //    },
         // },
         { component: WithHeader, props: { layoutType: "main" } },
      ],
   },
   feedback: {
      component: Feedback,
      actions: {
         close: (screen) => screen.change("home"),
      },
      wrappers: [
         { component: BestFit, props: { width: 900, height: 600, maxScale: 1.5 } },
         { component: OverlayButtons, props: { variation: "cross" } },
      ],
   },
   stats: {
      component: Stats,
      actions: {
         close: (screen) => screen.change("home"),
      },
      wrappers: [
         { component: BestFit, props: { width: 900, height: 600, maxScale: 1.5 } },
         { component: OverlayButtons, props: { variation: "cross" } },
      ],
   },
};
