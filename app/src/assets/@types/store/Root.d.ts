import {GetterTree, MutationTree, ActionTree} from 'vuex'

import {Getters} from './Getters'
import {Mutations} from './Mutations'
import {Actions} from './Actions'

interface RootGetters extends GetterTree < Getters, any > {}

interface RootMutation extends MutationTree < Mutations >{}

interface RootActions extends ActionTree < Actions, any >{}