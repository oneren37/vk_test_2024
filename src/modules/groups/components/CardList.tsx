import React from "react";
import { Div, Card, Text, Avatar, Link, Popover, Cell, List } from "@vkontakte/vkui";
import { Group } from "../types";

interface CardListProps {
  groups: Group[];
}

const CardList: React.FC<CardListProps> = ({ groups }) => {
  return (
    <Div>
      {groups.map((group) => (
        <Card key={group.id} style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "12px" }}>
            <Avatar 
              style={{ backgroundColor: `${group.avatar_color}`, marginRight: "12px" }} 
              size={48} 
              initials={group.name.charAt(0)}
            />
            <div>
              <Text>{group.name}</Text>
              <Text style={{ color: "var(--vkui--color_icon_secondary)" }}>
                {group.closed ? "Закрытая группа" : "Открытая группа"} · {group.members_count} участников
              </Text>
              {group.friends && (
                <Popover
                  noStyling
                  trigger="click"
                  id="menupopup"
                  role="menu"
                  aria-labelledby="menubutton"
                  content={({ onClose }) => (
                    <List
                      style={{
                        backgroundColor: 'var(--vkui--color_background_modal)',
                        borderRadius: 8,
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {group.friends!.map((friend, index) => (
                        <Cell  key={index}>
                          <Text>{friend.first_name} {friend.last_name}</Text>
                        </Cell >
                      ))}
                    </List>
                  )}
                >
                  <Link style={{ color: "#6D7885" }}>
                    {group.friends.length} друзей
                  </Link>
                </Popover>
              )}
            </div>
          </div>
        </Card>
      ))}
    </Div>
  );
};

export default CardList;

