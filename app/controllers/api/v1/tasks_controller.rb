class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @tasks = current_user.tasks.all
  end

  def show
    if authorized?
      respond_to do |format|
        format.json { render :show }
      end
    else
      handle_unauthorized
    end
  end

  def create
    @task = current_user.tasks.build(task_params)
    if authorized?
      respond_to do |format|
        if @task.save
          format.json { render :show, status: :created, location: api_v1_task_path(@task) }
        else
          format.json { render json: @task.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |format|
        if @task.update(task_params)
          format.json { render :show, status: :created, location: api_v1_task_path(@task) }
        else
          format.json { render json: @task.errors, status: :unprocessable_entity }
        end
      end
    else
      handle_unauthorized
    end    
  end

  def destroy
    if authorized?
      @task.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    else
      handle_unauthorized
    end
  end

  private
    def set_task      
      @task = Task.find(params[:id])
    end

    def authorized?
      @task.user == current_user
    end

    def handle_unauthorized
      unless authorized?
        respond_to do |format|
          format.json { render :unauthorized, status: 401 }
        end
      end
    end

    def task_params
      params.require(:task).permit(:title, :description, :status, :priority, tags: [])
    end
end
