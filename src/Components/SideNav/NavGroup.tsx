import { Collapse } from "@mantine/core";
import React from "react";
import { TPageData } from "../../Pages";
import { ParentMenuItem } from "./MenuItem";
import { GroupTitle } from "./GroupTitle";

type Props = {
  navValues: TPageData[][];
  idx: number;
  navKey: string;
};

export function NavGroup({ navValues, idx, navKey }: Props) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      <GroupTitle
        isGroupOpened={isOpened}
        setIsGroupOpened={setIsOpened}
        title={navKey as string}
      />
      <Collapse in={isOpened}>
        {navValues[idx].map((navValue, index) => {
          if (navValue.level === "1" && navValue.hasChildren) {
            return (
              <ParentMenuItem
                Icon={navValue.icon}
                key={index}
                title={navValue.title}
              />
            );
          }
        })}
      </Collapse>
    </>
  );
}
