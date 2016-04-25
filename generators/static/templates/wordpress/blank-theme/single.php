<?php
/**
 * @package WordPress
 * @subpackage <%= themeName %>
 * @since <%= themeName %> 1.0
 */
 get_header(); ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<article <?php post_class() ?> id="post-<?php the_ID(); ?>">
			
			<h1 class="entry-title"><?php the_title(); ?></h1>

			<div class="entry-content">
				
				<?php the_content(); ?>

				<?php wp_link_pages(array('before' => __('Pages: ','<%= themeNameSpace %>'), 'next_or_number' => 'number')); ?>
				
				<?php the_tags( __('Tags: ','<%= themeNameSpace %>'), ', ', ''); ?>
			
				<?php posted_on(); ?>

			</div>
			
			<?php edit_post_link(__('Edit this entry','<%= themeNameSpace %>'),'','.'); ?>
			
		</article>

	<?php comments_template(); ?>

	<?php endwhile; endif; ?>

<?php post_navigation(); ?>
	
<?php get_sidebar(); ?>

<?php get_footer(); ?>