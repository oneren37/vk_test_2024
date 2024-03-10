import React from "react";
import { Placeholder, Button, Separator, Title, Div } from "@vkontakte/vkui";
import Controls from "./components/Controls";
import { fetchColors, fetchGroups } from "./api";
import { FilterOptions, Group } from "./types";
import CardList from "./components/CardList";

const Groups = () => {

  const [groups, setGroups] = React.useState<Group[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [colors, setColors] = React.useState<string[]>([]);

  const [filters, setFilters] = React.useState<FilterOptions>({
    privacy: 'all',
    color: 'any',
    withFriends: false
  });

  React.useEffect(() => {
    fetchColors()
      .then(data => setColors(data))
  }, [])

  const loadGroups = () => {
    setLoading(true);
    setError(null)

    fetchGroups(filters)
      .catch(_ => setError("Ошибка загрузки"))
      .then(data => data && setGroups(data))
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    loadGroups()
  }, [filters]);

  return (
    <>
        <Div><Title level="1" style={{ marginBottom: 16 }}>Группы</Title></Div>
        <Controls 
          values={filters}
          onChange={setFilters}
          colorOptions={colors}
        />
        <Separator />
        {loading && <Placeholder>Загрузка...</Placeholder>}
        {error && <Placeholder 
          action={<Button size="s" mode="secondary" onClick={loadGroups}>Перезагрузить</Button>}
        >{error}</Placeholder>}
        {!loading && !error && (<>
          {groups.length === 0 && (<Placeholder>Нет подходящих групп</Placeholder>)}
          {groups.length > 0 && (<CardList groups={groups} />)}
        </>)}
    </>
  )
}

export default Groups;
