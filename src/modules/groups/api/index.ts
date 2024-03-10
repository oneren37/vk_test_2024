import { FilterOptions, GetGroupsResponse, Group } from '../types'
import groups from './mock'

// функция генерит 20% ошибочных ответов
const getRandomResult = ():GetGroupsResponse  => {
    const options: GetGroupsResponse[] = [
        {
            result: 0
        },
        {
            result: 1,
            data: groups
        }
    ]

    return options.sort(() => Math.random()-0.8)[0]
    // return options[0]
    // return options[1]
}


export async function fetchGroups(filters: FilterOptions): Promise<Group[]|null> {
    return new Promise<GetGroupsResponse>((resolve) => {
        setTimeout(() => {
            resolve(getRandomResult())
        }, 1000)
    })
    .then(res => {
        if (res.result === 0 || !res.data) {
            throw new Error('fetch failed')
        }
        
        return res.data
    })
    .then(res => {
        return res.filter(g => {
            return (!filters.withFriends || (g.friends && g.friends.length > 0)) &&
               (filters.privacy === 'all' || (filters.privacy === 'open' && !g.closed) || (filters.privacy === 'close' && g.closed)) &&
               (!filters.color || filters.color === 'any' || g.avatar_color === filters.color);
        })
    })
}

export async function fetchColors(): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
        setTimeout(() => {
            resolve(Array.from(new Set(groups
                .map(group => group.avatar_color)
                .filter((color): color is string => !!color))))
        }, 100)
    })
}

