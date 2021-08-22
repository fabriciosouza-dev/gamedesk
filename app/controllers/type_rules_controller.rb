class TypeRulesController < ApplicationController
  before_action :set_type_rule, only: %i[ show edit update destroy ]

  # GET /type_rules or /type_rules.json
  def index
    @type_rules = TypeRule.all
  end

  # GET /type_rules/1 or /type_rules/1.json
  def show
  end

  # GET /type_rules/new
  def new
    @type_rule = TypeRule.new
  end

  # GET /type_rules/1/edit
  def edit
  end

  # POST /type_rules or /type_rules.json
  def create
    @type_rule = TypeRule.new(type_rule_params)

    respond_to do |format|
      if @type_rule.save
        format.html { redirect_to @type_rule, notice: "Type rule was successfully created." }
        format.json { render :show, status: :created, location: @type_rule }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @type_rule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /type_rules/1 or /type_rules/1.json
  def update
    respond_to do |format|
      if @type_rule.update(type_rule_params)
        format.html { redirect_to @type_rule, notice: "Type rule was successfully updated." }
        format.json { render :show, status: :ok, location: @type_rule }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @type_rule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /type_rules/1 or /type_rules/1.json
  def destroy
    @type_rule.destroy
    respond_to do |format|
      format.html { redirect_to type_rules_url, notice: "Type rule was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_type_rule
      @type_rule = TypeRule.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def type_rule_params
      params.fetch(:type_rule, {})
    end
end
