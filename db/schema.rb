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

ActiveRecord::Schema.define(version: 2021_08_04_203230) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.integer "icon", comment: "Identifica a imagem do icone"
    t.string "regra", comment: "Identifica a regra do icone"
    t.string "descricao", comment: "Identifica a descrição do icone"
    t.integer "status", default: 1, comment: "Identifica se ativo ou inativo para o funcionario 0-Inativo 1-Ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
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
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "assignees", force: :cascade do |t|
    t.string "name", comment: "Identifica o nome do funcionario"
    t.string "email", comment: "Identifica o email do funcionario"
    t.string "phone", comment: "Identifica o telefone do funcionario"
    t.decimal "assignee_id", comment: "Identifica o id do zendesk funcionario"
    t.integer "status", default: 1, comment: "Identifica se ativo ou inativo o funcionario 0-Inativo 1-Ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer "ticket_id", comment: "Identifica o id do pai ticket do comentario"
    t.decimal "comment_id", comment: "Identifica o comment_id do comentario"
    t.string "body", comment: "Identifica o corpo do comentario"
    t.string "html_body", comment: "Identifica o html_body do comentario"
    t.string "ip_address", comment: "Identifica o ip do comentario"
    t.string "location", comment: "Identifica a localização do comentario"
    t.integer "public", comment: "Identifica se é publico o comentario"
    t.integer "flag_game", default: 0, comment: "Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim"
    t.datetime "open_at", comment: "Identifica o horario de abertura do comentario"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requesters", force: :cascade do |t|
    t.string "name", comment: "Identifica o nome do funcionario"
    t.string "email", comment: "Identifica o email do funcionario"
    t.string "phone", comment: "Identifica o telefone do funcionario"
    t.decimal "requester_id", comment: "Identifica o id do zendesk funcionario"
    t.integer "status", default: 1, comment: "Identifica se ativo ou inativo o funcionario 0-Inativo 1-Ativo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.integer "ticket_id", comment: "Identifica o id do ticket"
    t.string "subject", comment: "Identifica o assunto do ticket"
    t.string "raw_subject", comment: "Identifica o assunto cru do ticket"
    t.string "description", comment: "Identifica a descrição do ticket"
    t.string "priority", comment: "Identifica a prioridade do ticket"
    t.string "status", comment: "Identifica o status do ticket"
    t.string "recipient", comment: "Identifica o recebedor do ticket"
    t.decimal "requester_id", comment: "Identifica o solicitante id do ticket"
    t.decimal "submitter_id", comment: "Identifica o apresentador id do ticket"
    t.decimal "assignee_id", comment: "Identifica o atribuido id do ticket"
    t.decimal "organization_id", comment: "Identifica a organização id do ticket"
    t.decimal "group_id", comment: "Identifica o grupo id do ticket"
    t.decimal "forum_topic_id", comment: "Identifica o forum do ticket"
    t.decimal "problem_id", comment: "Identifica o problema id do ticket"
    t.integer "has_incidents", comment: "Identifica o se tem incidentes id do ticket"
    t.integer "is_public", comment: "Identifica o se é publico o ticket"
    t.integer "allow_channelback", comment: "Identifica se permitir canal de retorno do ticket"
    t.integer "allow_attachments", comment: "Identifica se permitir anexos no ticket"
    t.string "satisfaction_rating", comment: "Identifica a satisfação do ticket"
    t.decimal "ticket_form_id", comment: "Identifica o formulario id do ticket"
    t.decimal "brand_id", comment: "Identifica a marca do ticket"
    t.date "due_at", comment: "Identifica o horario de devido do ticket"
    t.integer "flag_game", default: 0, comment: "Identifica se o ticket foi atualiazado nas regras do game 0-Não 1-Sim"
    t.decimal "xp", default: "0.0", comment: "Identifica o xp do ticket"
    t.integer "flag_calc_level", default: 0, comment: "Identifica o ticket foi calculado level 0-não 1-sim"
    t.datetime "open_at", comment: "Identifica o horario de abertura do ticket"
    t.datetime "changed_at", comment: "Identifica o horario de mudança do ticket"
    t.datetime "closed_at", comment: "Identifica o horario de abertura do ticket"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "pending_at"
  end

  create_table "user_achievements", force: :cascade do |t|
    t.decimal "assignee_id", comment: "Identifica o funcionario"
    t.integer "achievement_id", comment: "Identifica o relacionamento da conquista"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.boolean "admin"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "phone"
    t.decimal "assignee_id"
    t.integer "status"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "yields", force: :cascade do |t|
    t.decimal "assignee_id", comment: "Identifica o id do funcionario"
    t.integer "level", default: 0, comment: "Identifica o nível do funcionario"
    t.decimal "xp", default: "0.0", comment: "Identifica o xp do funcionario"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
