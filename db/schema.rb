# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_25_015058) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string "name", comment: "Identifica o nome do icone"
    t.string "regra", comment: "Identifica a regra do icone"
    t.string "descricao", comment: "Identifica a descrição do icone"
    t.integer "status", default: 1, comment: "Identifica se ativo ou inativo para o funcionario 0-Inativo 1-Ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "chave"
    t.integer "order"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_gamedesk.active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_gamedesk.active_storage_blobs_on_key", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.integer "ticket_id", comment: "Identifica o id do pai ticket do comentario"
    t.integer "flag_game", default: 0, comment: "Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim"
    t.datetime "open_at", comment: "Identifica o horario de abertura do comentario"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rewards", force: :cascade do |t|
    t.string "name", comment: "Identifica o nome da recompensa"
    t.string "recompensa", comment: "Identifica a recompensa"
    t.integer "status", default: 1, comment: "Identifica se ativo ou inativo a recompensa 0-Inativo 1-Ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.integer "ticket_id", comment: "Identifica o id do ticket"
    t.string "priority", comment: "Identifica a prioridade do ticket"
    t.integer "status", comment: "Identifica o status do ticket"
    t.integer "assignee_id", comment: "Identifica o atribuido id do ticket"
    t.integer "flag_game", default: 0, comment: "Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim"
    t.decimal "xp", default: "0.0", comment: "Identifica o xp do ticket"
    t.integer "flag_calc_level", default: 0, comment: "Identifica o ticket foi calculado level 0-não 1-sim"
    t.datetime "open_at", comment: "Identifica o horario de abertura do ticket"
    t.datetime "pending_at", comment: "Identifica o horario inicial de pendencia do ticket"
    t.datetime "changed_at", comment: "Identifica o horario de mudança do ticket"
    t.datetime "closed_at", comment: "Identifica o horario de abertura do ticket"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ticket_id"], name: "index_gamedesk.tickets_on_ticket_id", unique: true
  end

  create_table "type_associations", force: :cascade do |t|
    t.integer "type_rule_id"
    t.string "regra"
    t.integer "status"
    t.string "priority"
    t.integer "quantidade"
    t.datetime "dta_inicio"
    t.datetime "dta_fim"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "origem_type"
    t.bigint "origem_id"
    t.index ["origem_type", "origem_id"], name: "index_gamedesk.type_associations_on_origem_type_and_origem_id"
  end

  create_table "user_achievements", force: :cascade do |t|
    t.integer "assignee_id", comment: "Identifica o funcionario"
    t.integer "achievement_id", comment: "Identifica o relacionamento da conquista"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_rewards", force: :cascade do |t|
    t.integer "assignee_id", comment: "Identifica o funcionario"
    t.integer "reward_id", comment: "Identifica o relacionamento da conquista"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.boolean "admin"
    t.string "name"
    t.string "phone"
    t.integer "assignee_id"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["assignee_id"], name: "index_gamedesk.users_on_assignee_id", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "yields", force: :cascade do |t|
    t.integer "assignee_id", comment: "Identifica o id do funcionario"
    t.integer "level", default: 0, comment: "Identifica o nível do funcionario"
    t.decimal "xp", default: "0.0", comment: "Identifica o xp do funcionario"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "tickets", primary_key: "ticket_id"
  add_foreign_key "tickets", "users", column: "assignee_id", primary_key: "assignee_id"
  add_foreign_key "user_achievements", "achievements"
  add_foreign_key "user_achievements", "users", column: "assignee_id", primary_key: "assignee_id"
  add_foreign_key "user_rewards", "rewards"
  add_foreign_key "user_rewards", "users", column: "assignee_id", primary_key: "assignee_id"
  add_foreign_key "yields", "users", column: "assignee_id", primary_key: "assignee_id"
end
