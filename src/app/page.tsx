"use client";

import { css } from "../../styled-system/css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Logo } from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className={css({ height: "100vh" })}>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={20} minSize={15} maxSize={30}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle className={css({ w: "1px", bgColor: "sand.6" })} />
        <Panel defaultSize={80} minSize={20}>
          right
        </Panel>
      </PanelGroup>
    </div>
  );
}
