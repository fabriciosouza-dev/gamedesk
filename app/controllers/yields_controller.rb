class YieldsController < ApplicationController
  before_action :set_yield, only: %i[ show edit update destroy ]

  # GET /yields or /yields.json
  def index
    @yields = Yield.all
  end

  # GET /yields/1 or /yields/1.json
  def show
  end

  # GET /yields/new
  def new
    @yield = Yield.new
  end

  # GET /yields/1/edit
  def edit
  end

  # POST /yields or /yields.json
  def create
    @yield = Yield.new(yield_params)

    respond_to do |format|
      if @yield.save
        format.html { redirect_to @yield, notice: "Yield was successfully created." }
        format.json { render :show, status: :created, location: @yield }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @yield.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /yields/1 or /yields/1.json
  def update
    respond_to do |format|
      if @yield.update(yield_params)
        format.html { redirect_to @yield, notice: "Yield was successfully updated." }
        format.json { render :show, status: :ok, location: @yield }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @yield.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /yields/1 or /yields/1.json
  def destroy
    @yield.destroy
    respond_to do |format|
      format.html { redirect_to yields_url, notice: "Yield was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_yield
      @yield = Yield.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def yield_params
      params.fetch(:yield, {})
    end
end
