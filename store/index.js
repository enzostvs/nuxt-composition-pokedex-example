import storage from '~/utils/storage'
const name = 'pokemons'

const state = () => ({
  pokemon: {},
  pokemons: []
});

const actions = {
  SET_POKEMON({ commit }, pokemon) {
    commit('SET_POKEMON', pokemon);
  },
  ADD_POKEMON({ commit }, data) {
    const pokemon = {
      ...data,
      _id: Date.now()
    }
    commit('ADD_POKEMON', pokemon);
  },
  REMOVE_POKEMON({ commit }, data) {
    commit('REMOVE_POKEMON', data);
  },
  INIT_POKEMONS({ commit }) {
    if (storage.get(name)) {
      commit('SET_POKEMONS', storage.get(name));
    }
  }
};

const mutations = {
  SET_POKEMON(state, pokemon) {
    state.pokemon = pokemon;
  },
  ADD_POKEMON(state, pokemon) {
    state.pokemons.push(pokemon);
    storage.update(state.pokemons, name)
  },
  REMOVE_POKEMON(state, id) {
    state.pokemons = state.pokemons.filter(pokemon => pokemon._id !== id);
    storage.update(state.pokemons, name)
  },
  SET_POKEMONS(state, pokemons) {
    state.pokemons = pokemons;
  }
};

const getters = {
  pokemon: state => state.pokemon,
  pokemons: state => state.pokemons,
  total: state => state.pokemons.length
};

export default {
  state,
  actions,
  mutations,
  getters
}